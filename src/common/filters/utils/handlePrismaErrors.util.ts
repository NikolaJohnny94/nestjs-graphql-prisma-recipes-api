//Prisma
import { Prisma } from '@prisma/client';
//Types
import { ExceptionMeta, PrismaExceptionResponse } from './types';

export function handlePrismaError(
  eception: Prisma.PrismaClientKnownRequestError,
): PrismaExceptionResponse {
  let code: string;
  let message: string;
  let modelName: string;
  let target: string;

  let exceptionMeta: ExceptionMeta = { ...eception.meta };

  if (exceptionMeta) {
    if (exceptionMeta.modelName) modelName = exceptionMeta.modelName;
    if (exceptionMeta.target && exceptionMeta.target.length > 0) {
      target = exceptionMeta.target[0];
    }
  }

  switch (eception.code) {
    case 'P1000':
      code = 'AUTHENTICATION_FAILED';
      message = 'Authentication failed against the database server.';
      break;
    case 'P1001':
      code = 'SERVICE_UNAVAILABLE';
      message = 'Cannot reach the database server.';
      break;
    case 'P1002':
      code = 'TIMEOUT';
      message = 'The database server was reached but timed out.';
      break;
    case 'P1003':
      code = 'DATABASE_ERROR';
      message = 'The database server returned an error.';
      break;
    case 'P1008':
      code = 'TIMEOUT';
      message = 'Operations timed out.';
      break;
    case 'P1017':
      code = 'CONNECTION_CLOSED';
      message = 'Server has closed the connection.';
      break;
    case 'P2000':
      code = 'VALUE_TOO_LONG';
      message = 'The provided value for the column is too long.';
      break;
    case 'P2001':
      code = 'RECORD_NOT_FOUND';
      message =
        'The record searched for in the where condition does not exist.';
      break;
    case 'P2002':
      code = 'UNIQUE_CONSTRAINT_VIOLATION';
      message = `A ${modelName.toLowerCase()} with the same ${target} already exists. Please try again with a different ${target}.`;
      break;
    case 'P2003':
      code = 'FOREIGN_KEY_CONSTRAINT_FAILED';
      message = 'Foreign key constraint failed.';
      break;
    case 'P2004':
      code = 'CONSTRAINT_FAILED';
      message = 'A constraint failed on the database.';
      break;
    case 'P2005':
      code = 'INVALID_FIELD_VALUE';
      message = 'The value stored in the database for the field is invalid.';
      break;
    case 'P2006':
      code = 'INVALID_INPUT';
      message = 'The provided value for the field is invalid.';
      break;
    case 'P2007':
      code = 'VALIDATION_ERROR';
      message = 'Data validation error.';
      break;
    case 'P2008':
      code = 'QUERY_PARSE_FAILED';
      message = 'Failed to parse the query.';
      break;
    case 'P2009':
      code = 'QUERY_VALIDATION_FAILED';
      message = 'Failed to validate the query.';
      break;
    case 'P2010':
      code = 'RAW_QUERY_FAILED';
      message = 'Raw query failed.';
      break;
    case 'P2011':
      code = 'NULL_CONSTRAINT_VIOLATION';
      message = 'Null constraint violation.';
      break;
    case 'P2012':
      code = 'MISSING_REQUIRED_VALUE';
      message = 'Missing a required value.';
      break;
    case 'P2013':
      code = 'MISSING_REQUIRED_ARGUMENT';
      message = 'Missing the required argument.';
      break;
    case 'P2014':
      code = 'RELATION_VIOLATION';
      message =
        'The change would violate a required relation between the models.';
      break;
    case 'P2015':
      code = 'RELATED_RECORD_NOT_FOUND';
      message = 'A related record could not be found.';
      break;
    case 'P2016':
      code = 'QUERY_INTERPRETATION_ERROR';
      message = 'Query interpretation error.';
      break;
    case 'P2017':
      code = 'RELATION_NOT_CONNECTED';
      message = 'The records for the relation are not connected.';
      break;
    case 'P2018':
      code = 'REQUIRED_RECORDS_NOT_FOUND';
      message = 'The required connected records were not found.';
      break;
    case 'P2019':
      code = 'INPUT_ERROR';
      message = 'Input error.';
      break;
    case 'P2020':
      code = 'VALUE_OUT_OF_RANGE';
      message = 'Value out of range for the type.';
      break;
    case 'P2021':
      code = 'TABLE_NOT_FOUND';
      message = 'The table does not exist in the current database.';
      break;
    case 'P2022':
      code = 'COLUMN_NOT_FOUND';
      message = 'The column does not exist in the current database.';
      break;
    case 'P2023':
      code = 'INCONSISTENT_COLUMN_DATA';
      message = 'Inconsistent column data.';
      break;
    case 'P2024':
      code = 'CONNECTION_TIMEOUT';
      message = 'Timed out fetching a new connection from the connection pool.';
      break;
    case 'P2025':
      code = 'NOT_FOUND';
      message = `${modelName} not found.`;
      break;
    case 'P2026':
      code = 'FEATURE_NOT_SUPPORTED';
      message =
        "The database provider doesn't support a feature that the query used.";
      break;
    case 'P2027':
      code = 'MULTIPLE_DATABASE_ERRORS';
      message =
        'Multiple errors occurred on the database during query execution.';
      break;
    case 'P2028':
      code = 'TRANSACTION_ERROR';
      message = 'Transaction API error.';
      break;
    case 'P2029':
      code = 'QUERY_PARAMETER_LIMIT_EXCEEDED';
      message = 'Query parameter limit exceeded.';
      break;
    case 'P2030':
      code = 'MISSING_FULLTEXT_INDEX';
      message = 'Cannot find a fulltext index for the search.';
      break;
    case 'P2031':
      code = 'MONGODB_REPLICA_SET_REQUIRED';
      message = 'MongoDB server must run as a replica set for transactions.';
      break;
    case 'P2033':
      code = 'NUMBER_TOO_LARGE';
      message = 'A number in the query exceeds 64-bit integer limits.';
      break;
    case 'P2034':
      code = 'TRANSACTION_CONFLICT';
      message = 'Transaction failed due to a write conflict or deadlock.';
      break;
    case 'P2035':
      code = 'DATABASE_ASSERTION_VIOLATION';
      message = 'Assertion violation on the database.';
      break;
    case 'P2036':
      code = 'EXTERNAL_CONNECTOR_ERROR';
      message = 'Error in external connector.';
      break;
    case 'P2037':
      code = 'TOO_MANY_CONNECTIONS';
      message = 'Too many database connections opened.';
      break;
    default:
      code = 'INTERNAL_SERVER_ERROR';
      message = 'An unexpected error occurred. Please try again later.';
      break;
  }

  return { code, message };
}
