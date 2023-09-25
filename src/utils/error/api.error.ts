import { ErrorBase } from "./errors";

type ErrorName = 'API_ERROR';

export class API_ERROR extends ErrorBase<ErrorName> {};