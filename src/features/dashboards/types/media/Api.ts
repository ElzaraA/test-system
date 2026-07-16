/**
 * Данные распределения по темам для медиа-дашборда
 * @interface DistributionTopics
 */
export interface DistributionTopics {
    /** Количество обсуждений в СМИ */
    numberDiscussionsOnMedia: number;

    /** Количество обсуждений в социальных сетях */
    numberDiscussionsOnSocialNetworks: number;

    /** Количество обсуждений на ТВ */
    numberDiscussionsOnTv: number;

    /** Название темы */
    title: string;
}

/**
 * Данные по источникам медиа для дашборда
 * @interface SourcesMediaAgenda
 */
export interface SourcesMediaAgenda {
    /** Охват аудитории */
    coverage: number | null;

    /** Тип медиа-источника */
    mediaSourceType: string;

    /** Количество негативных упоминаний */
    negative: number;

    /** Количество нейтральных упоминаний */
    neutral: number;

    /** Количество позитивных упоминаний */
    positive: number;
}

/**
 * Данные за временной период (день, неделя, месяц)
 * @interface TimePeriod
 */
export interface TimePeriod {
    /** Распределение по темам */
    distributionTopics: DistributionTopics | DistributionTopics[];

    /** Дата и время окончания периода */
    endDateTime: string;

    /** Название периода */
    period: string ;

    /** Данные по источникам медиа */
    sourcesMediaAgenda: SourcesMediaAgenda | SourcesMediaAgenda[];

    /** Дата и время начала периода */
    startDateTime: string ;
}

/**
 * Полный ответ медиа-дашборда с сервера
 * @interface MediaAgendaResponse
 */
export interface MediaAgendaResponse {
    /** Данные за день */
    day: TimePeriod

    /** Данные за месяц */
    month: TimePeriod

    /** Данные за неделю */
    week: TimePeriod;

    /** Дата и время публикации */
    publishDateTime: string;
}

/**
 * Общий интерфейс для GraphQL ответов
 * @interface GraphQLResponse
 * @template T - тип данных в ответе
 */
export interface GraphQLResponse<T> {
    /** Данные ответа, содержащие GraphQL результат */
    data: {
        /** Данные GraphQL запроса */
        data: T;

        /** Ошибки GraphQL */
        errors?: Array<{
            message: string;
            extensions: {
                code: string;
            };
        }>;
    };

    /** Флаг успешности запроса */
    ok: boolean;

    /** Код ошибки */
    errCode: string;
}

