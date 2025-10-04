export type FlashMessageType = 'success' | 'error' | 'info' | 'warning';

export interface FlashMessage {
  type: FlashMessageType;
  code: string;
  message: string;
}

const ERROR_MESSAGE_MAP: Record<string, string> = {
  network_error: '接続に問題が発生しました。しばらく待ってから再試行してください。',
  oauthcallback: '接続に問題が発生しました。しばらく待ってから再試行してください。',
  oauthcallbackerror: '接続に問題が発生しました。しばらく待ってから再試行してください。',
  oauthsignin: 'ログインがキャンセルされました。',
  accessdenied: 'ログインがキャンセルされました。',
  session_expired: 'セッションが期限切れです。再度ログインしてください。',
  sessionrequired: 'セッションが期限切れです。再度ログインしてください。',
  sessionrequired_error: 'セッションが期限切れです。再度ログインしてください。',
  configuration: '認証サービスに問題が発生しています。しばらく待ってから再試行してください。',
  oauthcallbackhandling: '認証サービスに問題が発生しています。しばらく待ってから再試行してください。',
  serverside: '認証サービスに問題が発生しています。しばらく待ってから再試行してください。',
};

const SUCCESS_MESSAGE_MAP: Record<string, string> = {
  login: 'ログインしました。',
  logout: 'ログアウトしました。',
};

const DEFAULT_ERROR_MESSAGE = 'ログインに失敗しました。もう一度お試しください。';

export function getAuthErrorMessage(code: string | null | undefined): string | null {
  if (!code) {
    return null;
  }

  const normalized = code.toLowerCase();

  if (normalized in ERROR_MESSAGE_MAP) {
    return ERROR_MESSAGE_MAP[normalized];
  }

  return DEFAULT_ERROR_MESSAGE;
}

export function getAuthSuccessMessage(code: string | null | undefined): string | null {
  if (!code) {
    return null;
  }

  const normalized = code.toLowerCase();
  return SUCCESS_MESSAGE_MAP[normalized] ?? null;
}

export function createFlashMessageFromParams(params: URLSearchParams): FlashMessage | null {
  const errorCode = params.get('error');
  const successCode = params.get('success');

  const errorMessage = getAuthErrorMessage(errorCode);
  if (errorMessage && errorCode) {
    return {
      type: 'error',
      code: errorCode,
      message: errorMessage,
    };
  }

  const successMessage = getAuthSuccessMessage(successCode);
  if (successMessage && successCode) {
    return {
      type: 'success',
      code: successCode,
      message: successMessage,
    };
  }

  return null;
}
