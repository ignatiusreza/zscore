// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import './application.css';

import RailsUJS from '@rails/ujs';
import 'channels';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'routes';

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

RailsUJS.start();
ReactDOM.render(<Root />, document.getElementById('react-root'));
