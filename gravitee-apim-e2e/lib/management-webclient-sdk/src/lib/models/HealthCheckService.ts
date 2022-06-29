/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    HealthCheckStep,
    HealthCheckStepFromJSON,
    HealthCheckStepFromJSONTyped,
    HealthCheckStepToJSON,
} from './';

/**
 * 
 * @export
 * @interface HealthCheckService
 */
export interface HealthCheckService {
    /**
     * 
     * @type {boolean}
     * @memberof HealthCheckService
     */
    enabled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof HealthCheckService
     */
    schedule?: string;
    /**
     * 
     * @type {Array<HealthCheckStep>}
     * @memberof HealthCheckService
     */
    steps?: Array<HealthCheckStep>;
}

export function HealthCheckServiceFromJSON(json: any): HealthCheckService {
    return HealthCheckServiceFromJSONTyped(json, false);
}

export function HealthCheckServiceFromJSONTyped(json: any, ignoreDiscriminator: boolean): HealthCheckService {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'schedule': !exists(json, 'schedule') ? undefined : json['schedule'],
        'steps': !exists(json, 'steps') ? undefined : ((json['steps'] as Array<any>).map(HealthCheckStepFromJSON)),
    };
}

export function HealthCheckServiceToJSON(value?: HealthCheckService | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'schedule': value.schedule,
        'steps': value.steps === undefined ? undefined : ((value.steps as Array<any>).map(HealthCheckStepToJSON)),
    };
}


