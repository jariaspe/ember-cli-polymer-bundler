/* jshint node: true */
'use strict';

let assert = require('assert');
// libs
let Config = require('../../../lib/config');
// fixtures
let app = require('../../fixtures/app-fixture');
let project = require('../../fixtures/project-fixture');
let ui = require('../../fixtures/ui-fixture.js');

describe('auto-importer', function() {
  let AutoImporter;

  before(function() {
    AutoImporter = require('../../../lib/auto-importer');
    app.project.root = process.cwd();
    this.options = new Config(app);

    this.elements =
`<link rel="import" href="../../bower_components/paper-elements/paper-elements.html">
<link rel="import" href="../../bower_components/iron-icons/iron-icons.html">`;
  });

  it('loads it', function() {
    this.autoImporter = new AutoImporter(project, this.options, ui);
    assert.ok(this.autoImporter);
  });

  it('auto generates a html imports file', function() {
    let elements = this.autoImporter.importElements();
    assert.equal(elements, this.elements);
  });

  it('merges manual imports with auto-imported ones', function() {
    this.options.htmlImportsFile = 'test/fixtures/elements-fixture.html';
    let elements = this.autoImporter.importElements();
    assert.equal(elements, `${this.elements}
<link rel="import" href="../../bower_components/paper-button/paper-button.html">`);
  });

  it('does not import manual imports when already auto-imported', function() {
    this.options.htmlImportsFile = 'test/fixtures/elements-redundant-fixture.html';
    let elements = this.autoImporter.importElements();
    assert.equal(elements, this.elements);
  });

  it.skip('should not be necessary to trim() final output', function() {

  });
});
