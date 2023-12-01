/*
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

/**
 * Provider to temporarily ensure compatibility between AngularJs and Angular
 */
import { InjectionToken } from '@angular/core';
import { IScope } from 'angular';

export const CurrentUserService = new InjectionToken('CurrentUserService');

function currentUserServiceFactory(i: any) {
  return i.get('UserService');
}
export const currentUserProvider = {
  provide: CurrentUserService,
  useFactory: currentUserServiceFactory,
  deps: ['$injector'],
};

export const PortalSettingsService = new InjectionToken<IScope>('PortalSettingsService');

function portalSettingsServiceFactory(i: any) {
  return i.get('PortalConfigService');
}
export const portalSettingsProvider = {
  provide: PortalSettingsService,
  useFactory: portalSettingsServiceFactory,
  deps: ['$injector'],
};
