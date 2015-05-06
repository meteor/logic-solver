#!/bin/sh

# Assumes meteor/logic-solver and meteor/meteor have been cloned side-by-side,
# and we are in the logic-solver directory.

PKG=../meteor/packages/logic-solver # the Meteor package

( echo 'var C_MINISAT;' ; \
    cat $PKG/minisat.js ) > minisat.js
( echo 'var C_MINISAT = require("./minisat.js");' ; \
    echo 'var _ = require("underscore");' ; \
    echo 'var MiniSat;' ; \
    cat $PKG/minisat_wrapper.js ; \
    echo 'module.exports = MiniSat;' ) > minisat_wrapper.js
( echo 'var MiniSat = require("./minisat_wrapper.js");' ; \
    echo 'var _ = require("underscore");' ; \
    echo 'var Logic;' ; \
    cat $PKG/{types,logic,optimize}.js ;
    echo 'module.exports = Logic;' ) > logic-solver.js

cp $PKG/README.md README.md
