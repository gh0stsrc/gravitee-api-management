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
import { Injectable, Type } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { cloneDeep } from 'lodash';

import { ApiCreationPayload } from '../models/ApiCreationPayload';

export interface ApiCreationStep {
  position: number;
  label: string;
  component: Type<unknown>;
  patchPayload: (lastPayload: ApiCreationPayload) => ApiCreationPayload;
  type: 'primary' | 'secondary';
}

export type NewApiCreationStep = Omit<ApiCreationStep, 'type' | 'patchPayload'>;

/**
 * Service that manages the steps of the API creation process.
 */
@Injectable()
export class ApiCreationStepperService {
  private steps: ApiCreationStep[];

  private currentStepIndex = 0;
  private initialPayload: ApiCreationPayload = {};

  /**
   * Observable that emits an event every time the current step changes.
   */
  public currentStep$ = new Subject<ApiCreationStep>();

  /**
   * Observable that emits an event every time the steps change. Emit current steps to new subscribers.
   * This is useful when the steps are dynamically added or removed.
   */
  public steps$ = new ReplaySubject<ApiCreationStep[]>(1);

  constructor(creationStepPayload: NewApiCreationStep[], initialPayload?: ApiCreationPayload) {
    this.initialPayload = initialPayload ?? {};
    this.steps = creationStepPayload.map((stepPayload) => ({
      ...stepPayload,
      patchPayload: (p) => p,
      type: 'primary',
    }));
    this.steps$.next(this.steps);
  }

  /**
   * This function compile the data for a specific step of the API creation process by using the data from previous steps
   *
   * @param {ApiCreationStep} step - the current step of the API creation process
   * @returns {ApiCreationPayload} - the data for the current step
   */
  public compileStepPayload(step: ApiCreationStep): ApiCreationPayload {
    // Get all the previous steps of the current step
    const previousSteps = this.steps.slice(0, this.steps.indexOf(step));
    // Compute the data for the current step by using reduce method on the previous steps
    // The reduce method is used to combine all the data from the previous steps using the patchPayload method
    // The initial payload is used as the starting value for the reduce method
    return [...previousSteps, step].reduce((payload, previousStep) => previousStep.patchPayload(payload), this.initialPayload);
  }

  /**
   * Add a secondary step after the current step.
   */
  public addSecondaryStep(step: NewApiCreationStep) {
    this.steps.splice(this.currentStepIndex + 1, 0, {
      ...step,
      patchPayload: (p) => p,
      type: 'secondary',
    });
    this.steps$.next(this.steps);
  }

  public goToStep(index: number) {
    if (index < 0 || index >= this.steps.length) {
      throw new Error('Step index is out of bounds: ' + index);
    }
    this.currentStepIndex = index;
    this.currentStep$.next(this.steps[this.currentStepIndex]);
  }

  public goToNextStep(patchPayload: ApiCreationStep['patchPayload']) {
    // Save payload to current step & Force new object mutation for updated payload
    this.steps[this.currentStepIndex].patchPayload = (lastPayload) => patchPayload(cloneDeep(lastPayload));

    // Give current payload to next step
    this.goToStep(this.currentStepIndex + 1);
  }

  public goToPreviousStep() {
    this.goToStep(this.currentStepIndex - 1);
  }
}
