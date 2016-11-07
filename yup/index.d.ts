// Type definitions for yup v0.19.0
// Project: https://github.com/jquense/yup
// Definitions by: eyolas <https://github.com/eyolas>
// Definitions: https://github.com/eyolas/typings

declare module "yup" {
	export interface Ref {

	}
	export interface SchemaDescription {
		type: string,
		label: string,
		meta: Object,
		tests: Array<string>
	}

	interface MixedSchema<Schema extends MixedSchema<any>> {
		clone(): Schema;
		label(label: string): Schema;
		meta(metadata: Object): Schema;
		describe(): SchemaDescription;
		concat(Schema: Schema): void;
		validate(value: any, options?: Object, callback?: Function): Promise<any>;
		isValid(value: any, options?: Object, callback?: Function): Promise<boolean>;
		cast(value: any, opts?: Object): any;
		isType(value: any): boolean;
		strict(isStrict?: boolean): Schema;
		strip(stripField?: boolean): Schema;
		withMutation(builder: (current: Schema) => void): void;
		default(value: any): Schema;
		default(): any;
		nullable(isNullable?: boolean): Schema;
		required(message?: string): Schema;
		typeError(message: string): Schema;
		equals(arrayOfValues: Array<any>, message?: string): Schema;
		oneOf(arrayOfValues: Array<any>, message?: string): Schema;
		notOneOf(arrayOfValues: Array<any>, message?: string): Schema;
		test(name: string, message: string, test: Function, callbackStyleAsync?: boolean): Schema;
		test(options: Object): Schema;
		transform(transformFn: (currentValue: any, originalValue: any) => any): Schema;
		when(keys: string | Array<string>, builder: (value: any, schemaa: Schema) => Schema | Object): Schema;
	}

	interface StringSchema extends MixedSchema<StringSchema> {
		required(message?: string): StringSchema;
		min(limit: number | Ref, message?: string): StringSchema;
		max(limit: number | Ref, message?: string): StringSchema;
		matches(regex: RegExp, message?: string): StringSchema;
		email(message?: string): StringSchema;
		url(message?: string): StringSchema;
		ensure(): StringSchema;
		trim(message?: string): StringSchema;
		lowercase(message?: string): StringSchema;
		uppercase(message?: string): StringSchema;
	}

	interface NumberSchema extends MixedSchema<NumberSchema> {
		min(limit: number | Ref, message?: string): NumberSchema;
		max(limit: number | Ref, message?: string): NumberSchema;
		positive(message?: string): NumberSchema;
		negative(message?: string): NumberSchema;
		integer(message?: string): NumberSchema;
		truncate(): NumberSchema;
		round(type: string): NumberSchema;
	}

	interface BooleanSchema extends MixedSchema<BooleanSchema> { }


	interface DateSchema extends MixedSchema<DateSchema> {
		min(limit: Date | string | Ref, message?: string): DateSchema;
		max(limit: Date | string | Ref, message?: string): DateSchema;
	}

	interface ObjectSchema extends MixedSchema<ObjectSchema> {
		shape(fields: Object, noSortEdges?: Array<[string, string]>): ObjectSchema;
		from(fromKey: string, toKey: string, alias?: boolean): ObjectSchema;
		noUnknown(onlyKnownKeys?: boolean, message?: string): ObjectSchema;
		camelcase(): ObjectSchema;
		constantcase(): ObjectSchema;
	}

	export type AllSchema = StringSchema | NumberSchema | BooleanSchema | DateSchema | ObjectSchema;

	interface ArraySchema extends MixedSchema<ArraySchema> {
		of(type: AllSchema): ArraySchema;
		required(message?: string): ArraySchema;
		min(limit: number | Ref, message?: string): ArraySchema;
		max(limit: number | Ref, message?: string): ArraySchema;
		ensure(): ArraySchema;
		compact(rejector: (value: any) => boolean): ArraySchema;
	}

	interface Lazy {
	}

	export interface ValidationErrorInterface extends Error {
		name: string;
		path: string;
		errors: string[];
		inner: ValidationErrorInterface[]
	}

	// schema export
	export function mixed(): MixedSchema<any>;
	export function string(): StringSchema;
	export function number(): NumberSchema;
	export function boolean(): BooleanSchema;
	export function bool(): BooleanSchema;
	export function date(): DateSchema;
	export function object(): ObjectSchema;
	export function array(): ArraySchema;

	export function isSchema(object: any): boolean;


	export function reach(schema: AllSchema, path: string, value?: Object, context?: Object): AllSchema;
	export function addMethod(schemaType: AllSchema, name: string, method: () => AllSchema): void;
	export function ref(path: string, options: { contextPrefix: string }): Ref;
	export function lazy(fn: (value: any) => AllSchema): Lazy;
	export function ValidationError(errors: string | Array<string>, value: any, path: string): void;
}
