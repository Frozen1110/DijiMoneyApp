import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Email: any;
  MobileNumber: any;
};

export enum CurrencyCode {
  Aud = 'AUD',
  Ugx = 'UGX',
}

export type DepositCardInput = {
  amount: Scalars['Int'];
  walletId: Scalars['ID'];
};

export type DepositCardResponse = {
  __typename?: 'DepositCardResponse';
  proceedUrl: Scalars['String'];
  redirectUrl: Scalars['String'];
  depositId: Scalars['ID'];
};

export type DepositMobileMoneyInput = {
  amount: Scalars['Int'];
  walletId: Scalars['ID'];
  voucher?: Maybe<Scalars['String']>;
};

export type DepositMobileMoneyResponse = {
  __typename?: 'DepositMobileMoneyResponse';
  proceedUrl: Scalars['String'];
  redirectUrl: Scalars['String'];
  depositId: Scalars['ID'];
};

export type DepositStatusInput = {
  /** Id returned by deposit mutation */
  depositId: Scalars['ID'];
  /** Id returned by payment provider */
  transactionId: Scalars['ID'];
};

export type DepositStatusResponse = {
  __typename?: 'DepositStatusResponse';
  completed: Scalars['Boolean'];
  settledAmount: Scalars['Int'];
  chargedAmount: Scalars['Int'];
  fees?: Maybe<Scalars['Int']>;
};

export type FriendInvite = {
  __typename?: 'FriendInvite';
  name?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['MobileNumber']>;
  email?: Maybe<Scalars['Email']>;
  status?: Maybe<FriendInviteStatus>;
};

export type FriendInviteCollection = {
  __typename?: 'FriendInviteCollection';
  items?: Maybe<Array<FriendInvite>>;
  lastKey?: Maybe<Scalars['String']>;
};

export enum FriendInviteStatus {
  Invited = 'Invited',
  Accepted = 'Accepted',
}

export type FriendToInviteInput = {
  name?: Maybe<Scalars['String']>;
  mobileNumber?: Maybe<Scalars['MobileNumber']>;
  email?: Maybe<Scalars['Email']>;
};

export type InviteFriendsInput = {
  friends: Array<FriendToInviteInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  openWallet?: Maybe<Wallet>;
  sendMoneyToMobileNumber?: Maybe<Transaction>;
  sendMoneyToWallet?: Maybe<Transaction>;
  depositCard?: Maybe<DepositCardResponse>;
  depositMobileMoney?: Maybe<DepositMobileMoneyResponse>;
  depositStatus?: Maybe<DepositStatusResponse>;
  inviteFriends?: Maybe<Array<FriendInvite>>;
};

export type MutationOpenWalletArgs = {
  input?: Maybe<OpenWalletInput>;
};

export type MutationSendMoneyToMobileNumberArgs = {
  input?: Maybe<SendMoneyToMobileNumberInput>;
};

export type MutationSendMoneyToWalletArgs = {
  input?: Maybe<SendMoneyToWalletInput>;
};

export type MutationDepositCardArgs = {
  input?: Maybe<DepositCardInput>;
};

export type MutationDepositMobileMoneyArgs = {
  input?: Maybe<DepositMobileMoneyInput>;
};

export type MutationDepositStatusArgs = {
  input?: Maybe<DepositStatusInput>;
};

export type MutationInviteFriendsArgs = {
  input?: Maybe<InviteFriendsInput>;
};

export type MyInvitedFriendsFiltersInput = {
  limit?: Maybe<Scalars['Int']>;
  lastKey?: Maybe<Scalars['String']>;
};

export type MyWalletsFiltersInput = {
  limit?: Maybe<Scalars['Int']>;
  lastKey?: Maybe<Scalars['String']>;
};

export type OpenWalletInput = {
  currency: CurrencyCode;
};

export type Query = {
  __typename?: 'Query';
  myWallets?: Maybe<WalletCollection>;
  myTransactions?: Maybe<TransactionCollection>;
  me?: Maybe<User>;
  myInvitedFriends?: Maybe<FriendInviteCollection>;
};

export type QueryMyWalletsArgs = {
  input?: Maybe<MyWalletsFiltersInput>;
};

export type QueryMyTransactionsArgs = {
  input?: Maybe<WalletTransactionsFiltersInput>;
};

export type QueryMyInvitedFriendsArgs = {
  input?: Maybe<MyInvitedFriendsFiltersInput>;
};

export type SendMoneyToMobileNumberInput = {
  fromWalletId: Scalars['ID'];
  toMobileNumber: Scalars['MobileNumber'];
  amount: Scalars['Int'];
};

export type SendMoneyToWalletInput = {
  fromWalletId: Scalars['ID'];
  toWalletId: Scalars['ID'];
  amount: Scalars['Int'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  amount: Scalars['Int'];
  currency: CurrencyCode;
  status: TransactionStatus;
  type: TransactionType;
};

export type TransactionCollection = {
  __typename?: 'TransactionCollection';
  items?: Maybe<Array<Transaction>>;
  lastKey?: Maybe<Scalars['String']>;
};

export enum TransactionStatus {
  Initiated = 'INITIATED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export enum TransactionType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['ID'];
  currency: CurrencyCode;
  balance: Scalars['Int'];
};

export type WalletCollection = {
  __typename?: 'WalletCollection';
  items?: Maybe<Array<Wallet>>;
  lastKey?: Maybe<Scalars['String']>;
};

export type WalletTransactionsFiltersInput = {
  walletId?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
  lastKey?: Maybe<Scalars['String']>;
};

export type DepositCardMutationVariables = Exact<{
  amount: Scalars['Int'];
  walletId: Scalars['ID'];
}>;

export type DepositCardMutation = { __typename?: 'Mutation' } & {
  depositCard?: Maybe<
    { __typename?: 'DepositCardResponse' } & Pick<
      DepositCardResponse,
      'depositId' | 'proceedUrl' | 'redirectUrl'
    >
  >;
};

export type DepositMobileMoneyMutationVariables = Exact<{
  amount: Scalars['Int'];
  walletId: Scalars['ID'];
}>;

export type DepositMobileMoneyMutation = { __typename?: 'Mutation' } & {
  depositMobileMoney?: Maybe<
    { __typename?: 'DepositMobileMoneyResponse' } & Pick<
      DepositMobileMoneyResponse,
      'depositId' | 'proceedUrl' | 'redirectUrl'
    >
  >;
};

export type DepositStatusMutationVariables = Exact<{
  depositId: Scalars['ID'];
  transactionId: Scalars['ID'];
}>;

export type DepositStatusMutation = { __typename?: 'Mutation' } & {
  depositStatus?: Maybe<
    { __typename?: 'DepositStatusResponse' } & Pick<
      DepositStatusResponse,
      'completed' | 'settledAmount' | 'chargedAmount' | 'fees'
    >
  >;
};

export type GetMyBasicDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyBasicDetailsQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'name'>>;
};

export type GetMyWalletsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyWalletsQuery = { __typename?: 'Query' } & {
  myWallets?: Maybe<
    { __typename?: 'WalletCollection' } & {
      items?: Maybe<
        Array<{ __typename?: 'Wallet' } & Pick<Wallet, 'id' | 'currency' | 'balance'>>
      >;
    }
  >;
};

export type OpenWalletMutationVariables = Exact<{
  currency: CurrencyCode;
}>;

export type OpenWalletMutation = { __typename?: 'Mutation' } & {
  openWallet?: Maybe<{ __typename?: 'Wallet' } & Pick<Wallet, 'id'>>;
};

export const DepositCardDocument = gql`
  mutation DepositCard($amount: Int!, $walletId: ID!) {
    depositCard(input: { amount: $amount, walletId: $walletId }) {
      depositId
      proceedUrl
      redirectUrl
    }
  }
`;
export type DepositCardMutationFn = Apollo.MutationFunction<
  DepositCardMutation,
  DepositCardMutationVariables
>;

/**
 * __useDepositCardMutation__
 *
 * To run a mutation, you first call `useDepositCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDepositCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [depositCardMutation, { data, loading, error }] = useDepositCardMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      walletId: // value for 'walletId'
 *   },
 * });
 */
export function useDepositCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DepositCardMutation,
    DepositCardMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DepositCardMutation, DepositCardMutationVariables>(
    DepositCardDocument,
    options,
  );
}
export type DepositCardMutationHookResult = ReturnType<typeof useDepositCardMutation>;
export type DepositCardMutationResult = Apollo.MutationResult<DepositCardMutation>;
export type DepositCardMutationOptions = Apollo.BaseMutationOptions<
  DepositCardMutation,
  DepositCardMutationVariables
>;
export const DepositMobileMoneyDocument = gql`
  mutation DepositMobileMoney($amount: Int!, $walletId: ID!) {
    depositMobileMoney(input: { amount: $amount, walletId: $walletId }) {
      depositId
      proceedUrl
      redirectUrl
    }
  }
`;
export type DepositMobileMoneyMutationFn = Apollo.MutationFunction<
  DepositMobileMoneyMutation,
  DepositMobileMoneyMutationVariables
>;

/**
 * __useDepositMobileMoneyMutation__
 *
 * To run a mutation, you first call `useDepositMobileMoneyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDepositMobileMoneyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [depositMobileMoneyMutation, { data, loading, error }] = useDepositMobileMoneyMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      walletId: // value for 'walletId'
 *   },
 * });
 */
export function useDepositMobileMoneyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DepositMobileMoneyMutation,
    DepositMobileMoneyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DepositMobileMoneyMutation,
    DepositMobileMoneyMutationVariables
  >(DepositMobileMoneyDocument, options);
}
export type DepositMobileMoneyMutationHookResult = ReturnType<
  typeof useDepositMobileMoneyMutation
>;
export type DepositMobileMoneyMutationResult = Apollo.MutationResult<DepositMobileMoneyMutation>;
export type DepositMobileMoneyMutationOptions = Apollo.BaseMutationOptions<
  DepositMobileMoneyMutation,
  DepositMobileMoneyMutationVariables
>;
export const DepositStatusDocument = gql`
  mutation DepositStatus($depositId: ID!, $transactionId: ID!) {
    depositStatus(input: { depositId: $depositId, transactionId: $transactionId }) {
      completed
      settledAmount
      chargedAmount
      fees
    }
  }
`;
export type DepositStatusMutationFn = Apollo.MutationFunction<
  DepositStatusMutation,
  DepositStatusMutationVariables
>;

/**
 * __useDepositStatusMutation__
 *
 * To run a mutation, you first call `useDepositStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDepositStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [depositStatusMutation, { data, loading, error }] = useDepositStatusMutation({
 *   variables: {
 *      depositId: // value for 'depositId'
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useDepositStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DepositStatusMutation,
    DepositStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DepositStatusMutation, DepositStatusMutationVariables>(
    DepositStatusDocument,
    options,
  );
}
export type DepositStatusMutationHookResult = ReturnType<typeof useDepositStatusMutation>;
export type DepositStatusMutationResult = Apollo.MutationResult<DepositStatusMutation>;
export type DepositStatusMutationOptions = Apollo.BaseMutationOptions<
  DepositStatusMutation,
  DepositStatusMutationVariables
>;
export const GetMyBasicDetailsDocument = gql`
  query GetMyBasicDetails {
    me {
      name
    }
  }
`;

/**
 * __useGetMyBasicDetailsQuery__
 *
 * To run a query within a React component, call `useGetMyBasicDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBasicDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBasicDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyBasicDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyBasicDetailsQuery,
    GetMyBasicDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyBasicDetailsQuery, GetMyBasicDetailsQueryVariables>(
    GetMyBasicDetailsDocument,
    options,
  );
}
export function useGetMyBasicDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyBasicDetailsQuery,
    GetMyBasicDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyBasicDetailsQuery, GetMyBasicDetailsQueryVariables>(
    GetMyBasicDetailsDocument,
    options,
  );
}
export type GetMyBasicDetailsQueryHookResult = ReturnType<
  typeof useGetMyBasicDetailsQuery
>;
export type GetMyBasicDetailsLazyQueryHookResult = ReturnType<
  typeof useGetMyBasicDetailsLazyQuery
>;
export type GetMyBasicDetailsQueryResult = Apollo.QueryResult<
  GetMyBasicDetailsQuery,
  GetMyBasicDetailsQueryVariables
>;
export const GetMyWalletsDocument = gql`
  query GetMyWallets {
    myWallets {
      items {
        id
        currency
        balance
      }
    }
  }
`;

/**
 * __useGetMyWalletsQuery__
 *
 * To run a query within a React component, call `useGetMyWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyWalletsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyWalletsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyWalletsQuery, GetMyWalletsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyWalletsQuery, GetMyWalletsQueryVariables>(
    GetMyWalletsDocument,
    options,
  );
}
export function useGetMyWalletsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyWalletsQuery,
    GetMyWalletsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyWalletsQuery, GetMyWalletsQueryVariables>(
    GetMyWalletsDocument,
    options,
  );
}
export type GetMyWalletsQueryHookResult = ReturnType<typeof useGetMyWalletsQuery>;
export type GetMyWalletsLazyQueryHookResult = ReturnType<typeof useGetMyWalletsLazyQuery>;
export type GetMyWalletsQueryResult = Apollo.QueryResult<
  GetMyWalletsQuery,
  GetMyWalletsQueryVariables
>;
export const OpenWalletDocument = gql`
  mutation OpenWallet($currency: CurrencyCode!) {
    openWallet(input: { currency: $currency }) {
      id
    }
  }
`;
export type OpenWalletMutationFn = Apollo.MutationFunction<
  OpenWalletMutation,
  OpenWalletMutationVariables
>;

/**
 * __useOpenWalletMutation__
 *
 * To run a mutation, you first call `useOpenWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openWalletMutation, { data, loading, error }] = useOpenWalletMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useOpenWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<
    OpenWalletMutation,
    OpenWalletMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<OpenWalletMutation, OpenWalletMutationVariables>(
    OpenWalletDocument,
    options,
  );
}
export type OpenWalletMutationHookResult = ReturnType<typeof useOpenWalletMutation>;
export type OpenWalletMutationResult = Apollo.MutationResult<OpenWalletMutation>;
export type OpenWalletMutationOptions = Apollo.BaseMutationOptions<
  OpenWalletMutation,
  OpenWalletMutationVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
