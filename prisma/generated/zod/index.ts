import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const RecordScalarFieldEnumSchema = z.enum(['id','createdAt','url','description','landlord','lat','long','house_number','road','neighbourhood','suburb','borough','size','rooms','rent','wbs','properties','hover']);

export const NtfyScalarFieldEnumSchema = z.enum(['id','createdAt','host','topic','minRent','maxRent','minRooms','maxRooms','minSize','maxSize','landlords','boroughs']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

export const RecordSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  url: z.string(),
  description: z.string(),
  landlord: z.string(),
  lat: z.number(),
  long: z.number(),
  house_number: z.string(),
  road: z.string(),
  neighbourhood: z.string(),
  suburb: z.string(),
  borough: z.string(),
  size: z.number(),
  rooms: z.number(),
  rent: z.number(),
  wbs: z.boolean(),
  properties: z.string(),
  hover: z.boolean(),
})

export type Record = z.infer<typeof RecordSchema>

/////////////////////////////////////////
// NTFY SCHEMA
/////////////////////////////////////////

export const NtfySchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  host: z.string(),
  topic: z.string().nullable(),
  minRent: z.number().nullable(),
  maxRent: z.number().nullable(),
  minRooms: z.number().nullable(),
  maxRooms: z.number().nullable(),
  minSize: z.number().nullable(),
  maxSize: z.number().nullable(),
  landlords: z.string().nullable(),
  boroughs: z.string().nullable(),
})

export type Ntfy = z.infer<typeof NtfySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// RECORD
//------------------------------------------------------

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  url: z.boolean().optional(),
  description: z.boolean().optional(),
  landlord: z.boolean().optional(),
  lat: z.boolean().optional(),
  long: z.boolean().optional(),
  house_number: z.boolean().optional(),
  road: z.boolean().optional(),
  neighbourhood: z.boolean().optional(),
  suburb: z.boolean().optional(),
  borough: z.boolean().optional(),
  size: z.boolean().optional(),
  rooms: z.boolean().optional(),
  rent: z.boolean().optional(),
  wbs: z.boolean().optional(),
  properties: z.boolean().optional(),
  hover: z.boolean().optional(),
}).strict()

// NTFY
//------------------------------------------------------

export const NtfySelectSchema: z.ZodType<Prisma.NtfySelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  host: z.boolean().optional(),
  topic: z.boolean().optional(),
  minRent: z.boolean().optional(),
  maxRent: z.boolean().optional(),
  minRooms: z.boolean().optional(),
  maxRooms: z.boolean().optional(),
  minSize: z.boolean().optional(),
  maxSize: z.boolean().optional(),
  landlords: z.boolean().optional(),
  boroughs: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const RecordWhereInputSchema: z.ZodType<Prisma.RecordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  landlord: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  house_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  road: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  neighbourhood: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  suburb: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  borough: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rooms: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  wbs: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  properties: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hover: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const RecordOrderByWithRelationInputSchema: z.ZodType<Prisma.RecordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  landlord: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  house_number: z.lazy(() => SortOrderSchema).optional(),
  road: z.lazy(() => SortOrderSchema).optional(),
  neighbourhood: z.lazy(() => SortOrderSchema).optional(),
  suburb: z.lazy(() => SortOrderSchema).optional(),
  borough: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional(),
  wbs: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  hover: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordWhereUniqueInputSchema: z.ZodType<Prisma.RecordWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordWhereInputSchema),z.lazy(() => RecordWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  landlord: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  house_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  road: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  neighbourhood: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  suburb: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  borough: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rooms: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rent: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  wbs: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  properties: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hover: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export const RecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  landlord: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  house_number: z.lazy(() => SortOrderSchema).optional(),
  road: z.lazy(() => SortOrderSchema).optional(),
  neighbourhood: z.lazy(() => SortOrderSchema).optional(),
  suburb: z.lazy(() => SortOrderSchema).optional(),
  borough: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional(),
  wbs: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  hover: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecordSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecordScalarWhereWithAggregatesInputSchema),z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordScalarWhereWithAggregatesInputSchema),z.lazy(() => RecordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  landlord: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  long: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  house_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  road: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  neighbourhood: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  suburb: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  borough: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  rooms: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  rent: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  wbs: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  properties: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hover: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const NtfyWhereInputSchema: z.ZodType<Prisma.NtfyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NtfyWhereInputSchema),z.lazy(() => NtfyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NtfyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NtfyWhereInputSchema),z.lazy(() => NtfyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  topic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minRent: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxRent: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minRooms: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxRooms: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minSize: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxSize: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  landlords: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  boroughs: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NtfyOrderByWithRelationInputSchema: z.ZodType<Prisma.NtfyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  topic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minRent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minRooms: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRooms: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minSize: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxSize: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  landlords: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  boroughs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const NtfyWhereUniqueInputSchema: z.ZodType<Prisma.NtfyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => NtfyWhereInputSchema),z.lazy(() => NtfyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NtfyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NtfyWhereInputSchema),z.lazy(() => NtfyWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  topic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  minRent: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxRent: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minRooms: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxRooms: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  minSize: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  maxSize: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  landlords: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  boroughs: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const NtfyOrderByWithAggregationInputSchema: z.ZodType<Prisma.NtfyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  topic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minRent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minRooms: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxRooms: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  minSize: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  maxSize: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  landlords: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  boroughs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NtfyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NtfyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NtfyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NtfyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NtfySumOrderByAggregateInputSchema).optional()
}).strict();

export const NtfyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NtfyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NtfyScalarWhereWithAggregatesInputSchema),z.lazy(() => NtfyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NtfyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NtfyScalarWhereWithAggregatesInputSchema),z.lazy(() => NtfyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  host: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  topic: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  minRent: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  maxRent: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  minRooms: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  maxRooms: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  minSize: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  maxSize: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  landlords: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  boroughs: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RecordCreateInputSchema: z.ZodType<Prisma.RecordCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  url: z.string(),
  description: z.string(),
  landlord: z.string(),
  lat: z.number(),
  long: z.number(),
  house_number: z.string(),
  road: z.string(),
  neighbourhood: z.string(),
  suburb: z.string(),
  borough: z.string(),
  size: z.number(),
  rooms: z.number(),
  rent: z.number(),
  wbs: z.boolean(),
  properties: z.string(),
  hover: z.boolean()
}).strict();

export const RecordUncheckedCreateInputSchema: z.ZodType<Prisma.RecordUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  url: z.string(),
  description: z.string(),
  landlord: z.string(),
  lat: z.number(),
  long: z.number(),
  house_number: z.string(),
  road: z.string(),
  neighbourhood: z.string(),
  suburb: z.string(),
  borough: z.string(),
  size: z.number(),
  rooms: z.number(),
  rent: z.number(),
  wbs: z.boolean(),
  properties: z.string(),
  hover: z.boolean()
}).strict();

export const RecordUpdateInputSchema: z.ZodType<Prisma.RecordUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  landlord: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  house_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  road: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  neighbourhood: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  suburb: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  borough: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  wbs: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  properties: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hover: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordUncheckedUpdateInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  landlord: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  house_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  road: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  neighbourhood: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  suburb: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  borough: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  wbs: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  properties: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hover: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordCreateManyInputSchema: z.ZodType<Prisma.RecordCreateManyInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  url: z.string(),
  description: z.string(),
  landlord: z.string(),
  lat: z.number(),
  long: z.number(),
  house_number: z.string(),
  road: z.string(),
  neighbourhood: z.string(),
  suburb: z.string(),
  borough: z.string(),
  size: z.number(),
  rooms: z.number(),
  rent: z.number(),
  wbs: z.boolean(),
  properties: z.string(),
  hover: z.boolean()
}).strict();

export const RecordUpdateManyMutationInputSchema: z.ZodType<Prisma.RecordUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  landlord: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  house_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  road: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  neighbourhood: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  suburb: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  borough: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  wbs: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  properties: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hover: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  landlord: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  long: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  house_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  road: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  neighbourhood: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  suburb: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  borough: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rooms: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rent: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  wbs: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  properties: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hover: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NtfyCreateInputSchema: z.ZodType<Prisma.NtfyCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  host: z.string().optional(),
  topic: z.string().optional().nullable(),
  minRent: z.number().optional().nullable(),
  maxRent: z.number().optional().nullable(),
  minRooms: z.number().optional().nullable(),
  maxRooms: z.number().optional().nullable(),
  minSize: z.number().optional().nullable(),
  maxSize: z.number().optional().nullable(),
  landlords: z.string().optional().nullable(),
  boroughs: z.string().optional().nullable()
}).strict();

export const NtfyUncheckedCreateInputSchema: z.ZodType<Prisma.NtfyUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  host: z.string().optional(),
  topic: z.string().optional().nullable(),
  minRent: z.number().optional().nullable(),
  maxRent: z.number().optional().nullable(),
  minRooms: z.number().optional().nullable(),
  maxRooms: z.number().optional().nullable(),
  minSize: z.number().optional().nullable(),
  maxSize: z.number().optional().nullable(),
  landlords: z.string().optional().nullable(),
  boroughs: z.string().optional().nullable()
}).strict();

export const NtfyUpdateInputSchema: z.ZodType<Prisma.NtfyUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landlords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  boroughs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NtfyUncheckedUpdateInputSchema: z.ZodType<Prisma.NtfyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landlords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  boroughs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NtfyCreateManyInputSchema: z.ZodType<Prisma.NtfyCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  host: z.string().optional(),
  topic: z.string().optional().nullable(),
  minRent: z.number().optional().nullable(),
  maxRent: z.number().optional().nullable(),
  minRooms: z.number().optional().nullable(),
  maxRooms: z.number().optional().nullable(),
  minSize: z.number().optional().nullable(),
  maxSize: z.number().optional().nullable(),
  landlords: z.string().optional().nullable(),
  boroughs: z.string().optional().nullable()
}).strict();

export const NtfyUpdateManyMutationInputSchema: z.ZodType<Prisma.NtfyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landlords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  boroughs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NtfyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NtfyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  host: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  topic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRent: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxRooms: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  minSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  maxSize: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  landlords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  boroughs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const RecordCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  landlord: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  house_number: z.lazy(() => SortOrderSchema).optional(),
  road: z.lazy(() => SortOrderSchema).optional(),
  neighbourhood: z.lazy(() => SortOrderSchema).optional(),
  suburb: z.lazy(() => SortOrderSchema).optional(),
  borough: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional(),
  wbs: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  hover: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecordAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  landlord: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  house_number: z.lazy(() => SortOrderSchema).optional(),
  road: z.lazy(() => SortOrderSchema).optional(),
  neighbourhood: z.lazy(() => SortOrderSchema).optional(),
  suburb: z.lazy(() => SortOrderSchema).optional(),
  borough: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional(),
  wbs: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  hover: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  landlord: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  house_number: z.lazy(() => SortOrderSchema).optional(),
  road: z.lazy(() => SortOrderSchema).optional(),
  neighbourhood: z.lazy(() => SortOrderSchema).optional(),
  suburb: z.lazy(() => SortOrderSchema).optional(),
  borough: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional(),
  wbs: z.lazy(() => SortOrderSchema).optional(),
  properties: z.lazy(() => SortOrderSchema).optional(),
  hover: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecordSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  long: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  rooms: z.lazy(() => SortOrderSchema).optional(),
  rent: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const NtfyCountOrderByAggregateInputSchema: z.ZodType<Prisma.NtfyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  topic: z.lazy(() => SortOrderSchema).optional(),
  minRent: z.lazy(() => SortOrderSchema).optional(),
  maxRent: z.lazy(() => SortOrderSchema).optional(),
  minRooms: z.lazy(() => SortOrderSchema).optional(),
  maxRooms: z.lazy(() => SortOrderSchema).optional(),
  minSize: z.lazy(() => SortOrderSchema).optional(),
  maxSize: z.lazy(() => SortOrderSchema).optional(),
  landlords: z.lazy(() => SortOrderSchema).optional(),
  boroughs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NtfyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NtfyAvgOrderByAggregateInput> = z.object({
  minRent: z.lazy(() => SortOrderSchema).optional(),
  maxRent: z.lazy(() => SortOrderSchema).optional(),
  minRooms: z.lazy(() => SortOrderSchema).optional(),
  maxRooms: z.lazy(() => SortOrderSchema).optional(),
  minSize: z.lazy(() => SortOrderSchema).optional(),
  maxSize: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NtfyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NtfyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  topic: z.lazy(() => SortOrderSchema).optional(),
  minRent: z.lazy(() => SortOrderSchema).optional(),
  maxRent: z.lazy(() => SortOrderSchema).optional(),
  minRooms: z.lazy(() => SortOrderSchema).optional(),
  maxRooms: z.lazy(() => SortOrderSchema).optional(),
  minSize: z.lazy(() => SortOrderSchema).optional(),
  maxSize: z.lazy(() => SortOrderSchema).optional(),
  landlords: z.lazy(() => SortOrderSchema).optional(),
  boroughs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NtfyMinOrderByAggregateInputSchema: z.ZodType<Prisma.NtfyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  host: z.lazy(() => SortOrderSchema).optional(),
  topic: z.lazy(() => SortOrderSchema).optional(),
  minRent: z.lazy(() => SortOrderSchema).optional(),
  maxRent: z.lazy(() => SortOrderSchema).optional(),
  minRooms: z.lazy(() => SortOrderSchema).optional(),
  maxRooms: z.lazy(() => SortOrderSchema).optional(),
  minSize: z.lazy(() => SortOrderSchema).optional(),
  maxSize: z.lazy(() => SortOrderSchema).optional(),
  landlords: z.lazy(() => SortOrderSchema).optional(),
  boroughs: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NtfySumOrderByAggregateInputSchema: z.ZodType<Prisma.NtfySumOrderByAggregateInput> = z.object({
  minRent: z.lazy(() => SortOrderSchema).optional(),
  maxRent: z.lazy(() => SortOrderSchema).optional(),
  minRooms: z.lazy(() => SortOrderSchema).optional(),
  maxRooms: z.lazy(() => SortOrderSchema).optional(),
  minSize: z.lazy(() => SortOrderSchema).optional(),
  maxSize: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const RecordFindFirstArgsSchema: z.ZodType<Prisma.RecordFindFirstArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecordFindFirstOrThrowArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordFindManyArgsSchema: z.ZodType<Prisma.RecordFindManyArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecordAggregateArgsSchema: z.ZodType<Prisma.RecordAggregateArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecordGroupByArgsSchema: z.ZodType<Prisma.RecordGroupByArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithAggregationInputSchema.array(),RecordOrderByWithAggregationInputSchema ]).optional(),
  by: RecordScalarFieldEnumSchema.array(),
  having: RecordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecordFindUniqueArgsSchema: z.ZodType<Prisma.RecordFindUniqueArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecordFindUniqueOrThrowArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const NtfyFindFirstArgsSchema: z.ZodType<Prisma.NtfyFindFirstArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereInputSchema.optional(),
  orderBy: z.union([ NtfyOrderByWithRelationInputSchema.array(),NtfyOrderByWithRelationInputSchema ]).optional(),
  cursor: NtfyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NtfyScalarFieldEnumSchema,NtfyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NtfyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NtfyFindFirstOrThrowArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereInputSchema.optional(),
  orderBy: z.union([ NtfyOrderByWithRelationInputSchema.array(),NtfyOrderByWithRelationInputSchema ]).optional(),
  cursor: NtfyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NtfyScalarFieldEnumSchema,NtfyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NtfyFindManyArgsSchema: z.ZodType<Prisma.NtfyFindManyArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereInputSchema.optional(),
  orderBy: z.union([ NtfyOrderByWithRelationInputSchema.array(),NtfyOrderByWithRelationInputSchema ]).optional(),
  cursor: NtfyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NtfyScalarFieldEnumSchema,NtfyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NtfyAggregateArgsSchema: z.ZodType<Prisma.NtfyAggregateArgs> = z.object({
  where: NtfyWhereInputSchema.optional(),
  orderBy: z.union([ NtfyOrderByWithRelationInputSchema.array(),NtfyOrderByWithRelationInputSchema ]).optional(),
  cursor: NtfyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NtfyGroupByArgsSchema: z.ZodType<Prisma.NtfyGroupByArgs> = z.object({
  where: NtfyWhereInputSchema.optional(),
  orderBy: z.union([ NtfyOrderByWithAggregationInputSchema.array(),NtfyOrderByWithAggregationInputSchema ]).optional(),
  by: NtfyScalarFieldEnumSchema.array(),
  having: NtfyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NtfyFindUniqueArgsSchema: z.ZodType<Prisma.NtfyFindUniqueArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereUniqueInputSchema,
}).strict() ;

export const NtfyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NtfyFindUniqueOrThrowArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereUniqueInputSchema,
}).strict() ;

export const RecordCreateArgsSchema: z.ZodType<Prisma.RecordCreateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  data: z.union([ RecordCreateInputSchema,RecordUncheckedCreateInputSchema ]),
}).strict() ;

export const RecordUpsertArgsSchema: z.ZodType<Prisma.RecordUpsertArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereUniqueInputSchema,
  create: z.union([ RecordCreateInputSchema,RecordUncheckedCreateInputSchema ]),
  update: z.union([ RecordUpdateInputSchema,RecordUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecordCreateManyArgsSchema: z.ZodType<Prisma.RecordCreateManyArgs> = z.object({
  data: z.union([ RecordCreateManyInputSchema,RecordCreateManyInputSchema.array() ]),
}).strict() ;

export const RecordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RecordCreateManyAndReturnArgs> = z.object({
  data: z.union([ RecordCreateManyInputSchema,RecordCreateManyInputSchema.array() ]),
}).strict() ;

export const RecordDeleteArgsSchema: z.ZodType<Prisma.RecordDeleteArgs> = z.object({
  select: RecordSelectSchema.optional(),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordUpdateArgsSchema: z.ZodType<Prisma.RecordUpdateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  data: z.union([ RecordUpdateInputSchema,RecordUncheckedUpdateInputSchema ]),
  where: RecordWhereUniqueInputSchema,
}).strict() ;

export const RecordUpdateManyArgsSchema: z.ZodType<Prisma.RecordUpdateManyArgs> = z.object({
  data: z.union([ RecordUpdateManyMutationInputSchema,RecordUncheckedUpdateManyInputSchema ]),
  where: RecordWhereInputSchema.optional(),
}).strict() ;

export const RecordDeleteManyArgsSchema: z.ZodType<Prisma.RecordDeleteManyArgs> = z.object({
  where: RecordWhereInputSchema.optional(),
}).strict() ;

export const NtfyCreateArgsSchema: z.ZodType<Prisma.NtfyCreateArgs> = z.object({
  select: NtfySelectSchema.optional(),
  data: z.union([ NtfyCreateInputSchema,NtfyUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const NtfyUpsertArgsSchema: z.ZodType<Prisma.NtfyUpsertArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereUniqueInputSchema,
  create: z.union([ NtfyCreateInputSchema,NtfyUncheckedCreateInputSchema ]),
  update: z.union([ NtfyUpdateInputSchema,NtfyUncheckedUpdateInputSchema ]),
}).strict() ;

export const NtfyCreateManyArgsSchema: z.ZodType<Prisma.NtfyCreateManyArgs> = z.object({
  data: z.union([ NtfyCreateManyInputSchema,NtfyCreateManyInputSchema.array() ]),
}).strict() ;

export const NtfyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NtfyCreateManyAndReturnArgs> = z.object({
  data: z.union([ NtfyCreateManyInputSchema,NtfyCreateManyInputSchema.array() ]),
}).strict() ;

export const NtfyDeleteArgsSchema: z.ZodType<Prisma.NtfyDeleteArgs> = z.object({
  select: NtfySelectSchema.optional(),
  where: NtfyWhereUniqueInputSchema,
}).strict() ;

export const NtfyUpdateArgsSchema: z.ZodType<Prisma.NtfyUpdateArgs> = z.object({
  select: NtfySelectSchema.optional(),
  data: z.union([ NtfyUpdateInputSchema,NtfyUncheckedUpdateInputSchema ]),
  where: NtfyWhereUniqueInputSchema,
}).strict() ;

export const NtfyUpdateManyArgsSchema: z.ZodType<Prisma.NtfyUpdateManyArgs> = z.object({
  data: z.union([ NtfyUpdateManyMutationInputSchema,NtfyUncheckedUpdateManyInputSchema ]),
  where: NtfyWhereInputSchema.optional(),
}).strict() ;

export const NtfyDeleteManyArgsSchema: z.ZodType<Prisma.NtfyDeleteManyArgs> = z.object({
  where: NtfyWhereInputSchema.optional(),
}).strict() ;