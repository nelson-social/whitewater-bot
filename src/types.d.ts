/* eslint-disable @typescript-eslint/triple-slash-reference */

// KG: the import-style syntax by itself does not seem to make the typing work for date-fns-tz.
// KG: So using the triple slash syntax even though eslint doesn't like it.
// Appears to be a known issue: https://github.com/marnusw/date-fns-tz/issues/209

/// <reference path="../node_modules/date-fns-tz/typings.d.ts" />
import 'date-fns-tz/typings.d.ts';
