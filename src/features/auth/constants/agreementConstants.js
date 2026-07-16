/** ключ признания/отказа от соглашений */
export const AGREEMENT_KEY = 'agreement';

export const AGREEMENTS = {
  /** соглашение пользовательское */
  USER: 'f7c66bf1-8b87-47b1-9263-0ea3f54c683c',
  /** политика конфиденциальности */
  CONFIDENCE: '3bdc09db-6b8a-44df-9703-4b33ad2d838c',
  /** Согласие на обработку персональных данных */
  PRIVACY: 'a440eb64-87a5-4d77-a3cd-1b79b810a86a',
};

/** конфиг тоста пользовательского соглашения для "стендовых" пользователей */
export const INFINITE_AGREEMENT = {
  id: 'infinite-confidence-agree',
  buttonVariant: 'button-primary',
  buttonSize: 's',
  buttonText: 'Принять всё',
  classes: '_toast',
}
