/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.rest.api.service.impl;

import io.gravitee.common.data.domain.Page;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.UserRepository;
import io.gravitee.repository.management.api.search.UserCriteria;
import io.gravitee.repository.management.api.search.builder.PageableBuilder;
import io.gravitee.repository.management.model.*;
import io.gravitee.rest.api.model.NewUserMetadataEntity;
import io.gravitee.rest.api.model.ReferenceMetadataEntity;
import io.gravitee.rest.api.model.UpdateUserMetadataEntity;
import io.gravitee.rest.api.model.UserMetadataEntity;
import io.gravitee.rest.api.service.UserMetadataService;
import io.gravitee.rest.api.service.exceptions.MetadataNotFoundException;
import io.gravitee.rest.api.service.exceptions.TechnicalManagementException;
import io.gravitee.rest.api.service.sanitizer.CustomFieldSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static io.gravitee.repository.management.model.MetadataReferenceType.USER;
import static java.util.stream.Collectors.toList;

/**
 * @author Eric LELEU (eric.leleu at graviteesource.com)
 * @author GraviteeSource Team
 */
@Component
public class UserMetadataServiceImpl extends AbstractReferenceMetadataService implements UserMetadataService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserMetadataServiceImpl.class);

    @Autowired
    protected UserRepository userRepository;

    private UserMetadataEntity convert(ReferenceMetadataEntity record, String userId) {
        UserMetadataEntity metadata = new UserMetadataEntity();
        metadata.setFormat(io.gravitee.rest.api.model.MetadataFormat.valueOf(record.getFormat().name()));
        metadata.setKey(record.getKey());
        metadata.setName(record.getName());
        metadata.setValue(record.getValue());
        metadata.setUserId(userId);
        return metadata;
    }

    @Override
    public UserMetadataEntity create(NewUserMetadataEntity metadata) {
        return convert(create(metadata, USER, metadata.getUserId(), false), metadata.getUserId());
    }

    @Override
    public UserMetadataEntity update(UpdateUserMetadataEntity metadata) {
        return convert(update(metadata, USER, metadata.getUserId(), false), metadata.getUserId());
    }

    @Override
    public List<UserMetadataEntity> findAllByUserId(String userId) {
        final List<ReferenceMetadataEntity> allMetadata = findAllByReference(USER, userId, false);
        return allMetadata.stream()
                .map(m -> convert(m, userId))
                .collect(toList());
    }

    public void deleteAllByCustomFieldId(String key, String refId, CustomUserFieldReferenceType refType) {
        try {
            // CustomField is linked to an Org
            // we have to retrieve users based on org and then
            // delete the user metadata identifier by the field key and the userId
            final UserCriteria criteria = new UserCriteria.Builder().referenceId(refId).referenceType(UserReferenceType.valueOf(refType.name())).build();
            int pageNumber = 0;
            Page<User> pageOfUser = null;
            do {
                pageOfUser = this.userRepository.search(criteria, new PageableBuilder().pageNumber(pageNumber).pageSize(100).build());
                for (User user : pageOfUser.getContent()) {
                    try {
                        this.delete(CustomFieldSanitizer.formatKeyValue(key), USER, user.getId());
                    } catch (MetadataNotFoundException e) {
                        LOGGER.debug("Metadata key={}, refType={}, refId={} not found," +
                                " ignore error because we want to delete it and user may not have this metadata",
                                key, USER, user.getId());
                    }
                }
                pageNumber++;
            } while (pageOfUser.getPageElements() > 0);
        } catch (TechnicalException ex) {
            LOGGER.error("An error occurred while trying to all metadata with key {}", key, ex);
            throw new TechnicalManagementException("An error occurred while trying to all metadata with key " + key, ex);
        }
    }
}
