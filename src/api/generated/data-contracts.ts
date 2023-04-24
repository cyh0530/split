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

/** Body_scan_receipt_scan_post */
export interface BodyScanReceiptScanPost {
  /**
   * Receipt
   * @format binary
   */
  receipt: File;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** ReceiptItem */
export interface ReceiptItem {
  /** Name */
  name: string;
  /** Name Confidence */
  name_confidence: number;
  /** Quantity */
  quantity: number;
  /** Quantity Confidence */
  quantity_confidence: number;
  /** Unit Price */
  unit_price: number;
  /** Unit Price Confidence */
  unit_price_confidence: number;
  /** Total Price */
  total_price: number;
  /** Total Price Confidence */
  total_price_confidence: number;
}

/** ReceiptResult */
export interface ReceiptResult {
  /** Items */
  items: ReceiptItem[];
  /** Subtotal */
  subtotal: number;
  /** Tax */
  tax: number;
  /** Tip */
  tip: number;
  /** Total */
  total: number;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: any[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}
