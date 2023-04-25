/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from "./http-client";

export class Health<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Health Check
   *
   * @name HeatlhHealthGet
   * @summary Heatlh
   * @request GET:/health
   */
  heatlhHealthGet = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/health`,
      method: "GET",
      format: "json",
      ...params,
    });
}
