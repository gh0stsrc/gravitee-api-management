/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    HttpMethod,
    HttpMethodFromJSON,
    HttpMethodFromJSONTyped,
    HttpMethodToJSON,
} from './';

/**
 * 
 * @export
 * @interface AlertWebhook
 */
export interface AlertWebhook {
    /**
     * 
     * @type {HttpMethod}
     * @memberof AlertWebhook
     */
    httpMethod?: HttpMethod;
    /**
     * URL called by webhook
     * @type {string}
     * @memberof AlertWebhook
     */
    url?: string;
}

export function AlertWebhookFromJSON(json: any): AlertWebhook {
    return AlertWebhookFromJSONTyped(json, false);
}

export function AlertWebhookFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlertWebhook {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'httpMethod': !exists(json, 'httpMethod') ? undefined : HttpMethodFromJSON(json['httpMethod']),
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function AlertWebhookToJSON(value?: AlertWebhook | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'httpMethod': HttpMethodToJSON(value.httpMethod),
        'url': value.url,
    };
}


