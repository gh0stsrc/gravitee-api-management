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
/**
 * 
 * @export
 * @interface PortalNotification
 */
export interface PortalNotification {
    /**
     * Unique identifier of a portal notification.
     * @type {string}
     * @memberof PortalNotification
     */
    id?: string;
    /**
     * Title of the portal notification.
     * @type {string}
     * @memberof PortalNotification
     */
    title?: string;
    /**
     * Content of the notification.
     * @type {string}
     * @memberof PortalNotification
     */
    message?: string;
    /**
     * Creation date and time of the notification.
     * @type {Date}
     * @memberof PortalNotification
     */
    created_at?: Date;
}

export function PortalNotificationFromJSON(json: any): PortalNotification {
    return PortalNotificationFromJSONTyped(json, false);
}

export function PortalNotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortalNotification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
    };
}

export function PortalNotificationToJSON(value?: PortalNotification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'message': value.message,
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
    };
}


