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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import {
  GioBannerModule,
  GioFormTagsInputModule,
  GioIconsModule,
  GioFormSlideToggleModule,
  GioFormJsonSchemaModule,
} from '@gravitee/ui-particles-angular';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';

import { PlanEditGeneralStepComponent } from './1-general-step/plan-edit-general-step.component';
import { PlanEditSecureStepComponent } from './2-secure-step/plan-edit-secure-step.component';
import { PlanEditRestrictionStepComponent } from './3-restriction-step/plan-edit-restriction-step.component';
import { ApiPlanFormComponent } from './api-plan-form.component';

import { GioSafePipeModule } from '../../../../shared/utils/safe.pipe.module';
import { SpecificJsonSchemaTypeModule } from '../../../../shared/components/specific-json-schema-type/specific-json-schema-type.module';

@NgModule({
  declarations: [ApiPlanFormComponent, PlanEditGeneralStepComponent, PlanEditSecureStepComponent, PlanEditRestrictionStepComponent],
  exports: [ApiPlanFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatAutocompleteModule,

    GioFormSlideToggleModule,
    GioFormTagsInputModule,
    GioIconsModule,
    GioBannerModule,
    GioFormJsonSchemaModule,
    GioSafePipeModule,
    SpecificJsonSchemaTypeModule,
  ],
})
export class ApiPlanFormModule {}
