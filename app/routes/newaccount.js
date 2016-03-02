'use strict';

var express = require('express');
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })