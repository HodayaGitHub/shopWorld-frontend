// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
// import { useDispatch, useSelector } from "react-redux"
import React from 'react'

import toyStoryLogoUrl from '/toy-story-logo.png?url'
import { Trans, useTranslation } from 'react-i18next'


const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
}

export function HomePage() {

    const {t, i18n} = useTranslation()



    return (
        <section>
            <h2>
                welcome to home page
            </h2>

            <div>
                {Object.keys(lngs).map((lng) =>
                    <button
                        type="submit"
                        key={lng}
                        onClick={() => i18n.changeLanguage(lng)}
                        disabled={i18n.resolvedLanguage === lng}
                    >
                        {lngs[lng].nativeName}
                    </button>
                )}
            </div>


            {/* <p>{t('learn')}</p> */}
            <Trans i18nKey="desc">hello description</Trans>

            <img src={toyStoryLogoUrl} alt="Toy Story Logo" />
        </section >
    )
}