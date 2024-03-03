import React from "react";
import { useTranslation } from 'react-i18next';
import routes from '../routes';

const NotFoundPage = () => {

    const { t } = useTranslation();

    return (
        <div className="text-center">
            <img alt={t('notFound.alt')} className="img-fluid h-25" />
            <h1 className="h4 text-muted">{t('notFound.title')}</h1>
            <p className="text-muted">
                {t('notFound.text')}
                {' '}
                <a href={routes.mainPage()}>{t('notFound.link')}</a>
            </p>
        </div>
    )
}

export default NotFoundPage