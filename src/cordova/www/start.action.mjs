// Copyright 2022 The Outline Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import url from 'url';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';

import {runAction} from '../../build/run_action.mjs';

import webpackConfig from './webpack_config.mjs';

/**
 * @description Starts the web app for development.
 */
export async function main() {
  await runAction('cordova/www/build', 'browser');
  await runAction('cordova/setup', 'browser');

  await new WebpackServer(webpackConfig.devServer, webpack(webpackConfig)).start();
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  await main(...process.argv.slice(2));
}