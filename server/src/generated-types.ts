import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AmountInput = {
  amount: Scalars['Float']['input'];
  currencyCode: Scalars['String']['input'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  accessToken: Scalars['String']['output'];
  expiresInSec: Scalars['Int']['output'];
  me?: Maybe<Me>;
  refreshExpiresInSec?: Maybe<Scalars['Int']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  tokenType: Scalars['String']['output'];
};

export type CashfreeOrderResult = {
  __typename?: 'CashfreeOrderResult';
  cfPaymentId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  paymentSessionId: Scalars['String']['output'];
};

export type Credential = {
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<PhoneNumberInput>;
  userName?: InputMaybe<Scalars['String']['input']>;
};

export type Currency = {
  __typename?: 'Currency';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type DateRangeInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type Me = {
  __typename?: 'Me';
  balance: Money;
  email: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<PhoneNumber>;
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Float']['output'];
  currency?: Maybe<Currency>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']['output']>;
  authenticate: AuthResult;
  createCashfreeOrder: CashfreeOrderResult;
  createUserDraft: Scalars['String']['output'];
  generatePhoneOTP: OtpResult;
  logout: Scalars['Boolean']['output'];
  refreshToken: AuthResult;
  saveUserDraft: Scalars['Boolean']['output'];
  updatePassword: Scalars['Boolean']['output'];
  useResource?: Maybe<UseResourceResult>;
  validatePhoneOTP: OtpValidationResult;
  verifyAndCompleteCashfreeOrder: Scalars['Boolean']['output'];
};


export type MutationAuthenticateArgs = {
  credential: Credential;
};


export type MutationCreateCashfreeOrderArgs = {
  amount: AmountInput;
  userId: Scalars['String']['input'];
};


export type MutationCreateUserDraftArgs = {
  input: UserInput;
};


export type MutationGeneratePhoneOtpArgs = {
  otpInput: OtpInput;
};


export type MutationLogoutArgs = {
  refreshToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSaveUserDraftArgs = {
  draftId: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationUseResourceArgs = {
  code: Scalars['String']['input'];
};


export type MutationValidatePhoneOtpArgs = {
  otp: Scalars['String']['input'];
  verificationToken: Scalars['String']['input'];
};


export type MutationVerifyAndCompleteCashfreeOrderArgs = {
  orderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type OtpInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<PhoneNumberInput>;
};

export type OtpResult = {
  __typename?: 'OTPResult';
  phoneNumber: PhoneNumber;
  success: Scalars['Boolean']['output'];
  verificationToken?: Maybe<Scalars['String']['output']>;
};

export type OtpValidationResult = {
  __typename?: 'OTPValidationResult';
  accessToken?: Maybe<Scalars['String']['output']>;
  expiresInSec: Scalars['Int']['output'];
  phoneNumber?: Maybe<PhoneNumber>;
  tokenType: Scalars['String']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  countryCode: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type PhoneNumberInput = {
  countryCode: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  me: Me;
  pageOfTransactions: Array<Transaction>;
  resourceDetails: Resource;
  templateDetails: TemplateDetails;
};


export type QueryPageOfTransactionsArgs = {
  filter?: InputMaybe<TransactionsFilter>;
};


export type QueryResourceDetailsArgs = {
  code: Scalars['String']['input'];
};


export type QueryTemplateDetailsArgs = {
  input: TemplateDetailsInput;
};

export type Resource = {
  __typename?: 'Resource';
  amountPerUse: Money;
  code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  maxCapacity?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ResourceReference = {
  __typename?: 'ResourceReference';
  code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['String']['output']>;
};

export type TemplateDetails = {
  __typename?: 'TemplateDetails';
  css: Scalars['String']['output'];
  html: Scalars['String']['output'];
  id: Scalars['String']['output'];
  javascript: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type TemplateDetailsInput = {
  slug: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Money;
  id: Scalars['String']['output'];
  resource?: Maybe<ResourceReference>;
  status: Scalars['String']['output'];
  transactionCompletionTime?: Maybe<Scalars['String']['output']>;
  transactionTime?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type TransactionsFilter = {
  dateRange?: InputMaybe<DateRangeInput>;
  statuses: Array<Scalars['String']['input']>;
};

export type UseResourceResult = {
  __typename?: 'UseResourceResult';
  status: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  enabled: Scalars['Boolean']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber: PhoneNumberInput;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AmountInput: AmountInput;
  AuthResult: ResolverTypeWrapper<AuthResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CashfreeOrderResult: ResolverTypeWrapper<CashfreeOrderResult>;
  Credential: Credential;
  Currency: ResolverTypeWrapper<Currency>;
  DateRangeInput: DateRangeInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Me: ResolverTypeWrapper<Me>;
  Money: ResolverTypeWrapper<Money>;
  Mutation: ResolverTypeWrapper<{}>;
  OTPInput: OtpInput;
  OTPResult: ResolverTypeWrapper<OtpResult>;
  OTPValidationResult: ResolverTypeWrapper<OtpValidationResult>;
  PhoneNumber: ResolverTypeWrapper<PhoneNumber>;
  PhoneNumberInput: PhoneNumberInput;
  Query: ResolverTypeWrapper<{}>;
  Resource: ResolverTypeWrapper<Resource>;
  ResourceReference: ResolverTypeWrapper<ResourceReference>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  TemplateDetails: ResolverTypeWrapper<TemplateDetails>;
  TemplateDetailsInput: TemplateDetailsInput;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionsFilter: TransactionsFilter;
  UseResourceResult: ResolverTypeWrapper<UseResourceResult>;
  UserInput: UserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AmountInput: AmountInput;
  AuthResult: AuthResult;
  Boolean: Scalars['Boolean']['output'];
  CashfreeOrderResult: CashfreeOrderResult;
  Credential: Credential;
  Currency: Currency;
  DateRangeInput: DateRangeInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Me: Me;
  Money: Money;
  Mutation: {};
  OTPInput: OtpInput;
  OTPResult: OtpResult;
  OTPValidationResult: OtpValidationResult;
  PhoneNumber: PhoneNumber;
  PhoneNumberInput: PhoneNumberInput;
  Query: {};
  Resource: Resource;
  ResourceReference: ResourceReference;
  String: Scalars['String']['output'];
  Subscription: {};
  TemplateDetails: TemplateDetails;
  TemplateDetailsInput: TemplateDetailsInput;
  Transaction: Transaction;
  TransactionsFilter: TransactionsFilter;
  UseResourceResult: UseResourceResult;
  UserInput: UserInput;
}>;

export type AuthResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResult'] = ResolversParentTypes['AuthResult']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresInSec?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  refreshExpiresInSec?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CashfreeOrderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashfreeOrderResult'] = ResolversParentTypes['CashfreeOrderResult']> = ResolversObject<{
  cfPaymentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentSessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Currency'] = ResolversParentTypes['Currency']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = ResolversObject<{
  balance?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MoneyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Money'] = ResolversParentTypes['Money']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authenticate?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'credential'>>;
  createCashfreeOrder?: Resolver<ResolversTypes['CashfreeOrderResult'], ParentType, ContextType, RequireFields<MutationCreateCashfreeOrderArgs, 'amount' | 'userId'>>;
  createUserDraft?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCreateUserDraftArgs, 'input'>>;
  generatePhoneOTP?: Resolver<ResolversTypes['OTPResult'], ParentType, ContextType, RequireFields<MutationGeneratePhoneOtpArgs, 'otpInput'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, Partial<MutationLogoutArgs>>;
  refreshToken?: Resolver<ResolversTypes['AuthResult'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'refreshToken'>>;
  saveUserDraft?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveUserDraftArgs, 'draftId'>>;
  updatePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'password'>>;
  useResource?: Resolver<Maybe<ResolversTypes['UseResourceResult']>, ParentType, ContextType, RequireFields<MutationUseResourceArgs, 'code'>>;
  validatePhoneOTP?: Resolver<ResolversTypes['OTPValidationResult'], ParentType, ContextType, RequireFields<MutationValidatePhoneOtpArgs, 'otp' | 'verificationToken'>>;
  verifyAndCompleteCashfreeOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyAndCompleteCashfreeOrderArgs, 'orderId' | 'userId'>>;
}>;

export type OtpResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OTPResult'] = ResolversParentTypes['OTPResult']> = ResolversObject<{
  phoneNumber?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  verificationToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OtpValidationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OTPValidationResult'] = ResolversParentTypes['OTPValidationResult']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiresInSec?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PhoneNumberResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhoneNumber'] = ResolversParentTypes['PhoneNumber']> = ResolversObject<{
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['Me'], ParentType, ContextType>;
  pageOfTransactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<QueryPageOfTransactionsArgs>>;
  resourceDetails?: Resolver<ResolversTypes['Resource'], ParentType, ContextType, RequireFields<QueryResourceDetailsArgs, 'code'>>;
  templateDetails?: Resolver<ResolversTypes['TemplateDetails'], ParentType, ContextType, RequireFields<QueryTemplateDetailsArgs, 'input'>>;
}>;

export type ResourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = ResolversObject<{
  amountPerUse?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxCapacity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResourceReferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceReference'] = ResolversParentTypes['ResourceReference']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_", ParentType, ContextType>;
}>;

export type TemplateDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemplateDetails'] = ResolversParentTypes['TemplateDetails']> = ResolversObject<{
  css?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  html?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  javascript?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource?: Resolver<Maybe<ResolversTypes['ResourceReference']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionCompletionTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UseResourceResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UseResourceResult'] = ResolversParentTypes['UseResourceResult']> = ResolversObject<{
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthResult?: AuthResultResolvers<ContextType>;
  CashfreeOrderResult?: CashfreeOrderResultResolvers<ContextType>;
  Currency?: CurrencyResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Money?: MoneyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OTPResult?: OtpResultResolvers<ContextType>;
  OTPValidationResult?: OtpValidationResultResolvers<ContextType>;
  PhoneNumber?: PhoneNumberResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  ResourceReference?: ResourceReferenceResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TemplateDetails?: TemplateDetailsResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  UseResourceResult?: UseResourceResultResolvers<ContextType>;
}>;

