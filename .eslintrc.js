module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "standard-with-typescript",
        // "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "no-tabs": "off",
        "@typescript-eslint/indent": 'off',
        "react/react-in-jsx-scope": 'off',
        '@typescript-eslint/promise-function-async': 'off',
        "@typescript-eslint/no-misused-promises": 'off',
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
    }
}
