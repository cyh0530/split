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

import { BodyScanReceiptScanPost, HTTPValidationError, ReceiptResult } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Scan<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Parse Receipt
   *
   * @name ScanReceiptScanPost
   * @summary Scan Receipt
   * @request POST:/scan
   */
  scanReceiptScanPost = (data: BodyScanReceiptScanPost, params: RequestParams = {}) =>
    this.request<ReceiptResult, HTTPValidationError>({
      path: `/scan`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
