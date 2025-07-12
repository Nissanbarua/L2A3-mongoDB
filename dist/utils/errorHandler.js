"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = formatError;
function formatError(message, error) {
    return {
        message,
        success: false,
        error,
    };
}
