import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";

import messages from "./messages";

const LanguageProvider = ({ children, locale }) => (
    <IntlProvider
        textComponent={Fragment}
        locale={locale}
        messages={messages[locale]}
    >
        {children}
    </IntlProvider>
);
export default LanguageProvider;
