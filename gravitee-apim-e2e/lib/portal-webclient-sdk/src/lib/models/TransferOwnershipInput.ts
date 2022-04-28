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
 * @interface TransferOwnershipInput
 */
export interface TransferOwnershipInput {
    /**
     * User identifier of the new Primary Owner of the application.
     * @type {string}
     * @memberof TransferOwnershipInput
     */
    new_primary_owner_id?: string;
    /**
     * User reference of the new Primary Owner of the application.
     * @type {string}
     * @memberof TransferOwnershipInput
     */
    new_primary_owner_reference?: string;
    /**
     * New role to be affected to the current PrimaryOwner.
     * @type {string}
     * @memberof TransferOwnershipInput
     */
    primary_owner_newrole?: string;
}

export function TransferOwnershipInputFromJSON(json: any): TransferOwnershipInput {
    return TransferOwnershipInputFromJSONTyped(json, false);
}

export function TransferOwnershipInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransferOwnershipInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'new_primary_owner_id': !exists(json, 'new_primary_owner_id') ? undefined : json['new_primary_owner_id'],
        'new_primary_owner_reference': !exists(json, 'new_primary_owner_reference') ? undefined : json['new_primary_owner_reference'],
        'primary_owner_newrole': !exists(json, 'primary_owner_newrole') ? undefined : json['primary_owner_newrole'],
    };
}

export function TransferOwnershipInputToJSON(value?: TransferOwnershipInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'new_primary_owner_id': value.new_primary_owner_id,
        'new_primary_owner_reference': value.new_primary_owner_reference,
        'primary_owner_newrole': value.primary_owner_newrole,
    };
}


