import 'core-js/features/array/for-each';
import 'core-js/features/array/filter';
import 'core-js/features/array/includes';
import CI360Viewer from './ci360.service';
import { attr } from './ci360.utils';

function setContainerId(container) {
  const containerId = container.id;

  if (!containerId) {
    const uniqueId = Math.floor(Math.random() * 10000);
    const generatedContainerId = `cloudimage-360-view-${uniqueId}`;

    container.id = generatedContainerId;
  }

  return container;
}

function init() {
  const viewers = [];
  const view360Array = document.querySelectorAll('.cloudimage-360:not(.initialized)');
  const hotspotsConfigs = window.CI360.hotspots|| {};

  [].slice.call(view360Array).forEach(container => {
    const containerWithId = setContainerId(container);

    const hotspotInstanceName = attr(containerWithId, 'hotspot-instance') ||
      attr(containerWithId, 'data-hotspot-instance');

    const hotspotConfig = hotspotsConfigs?.[hotspotInstanceName];

    viewers.push(new CI360Viewer(containerWithId, false, hotspotConfig));
  })

  window.CI360._viewers = viewers;
}

function destroy() {
  if (isNoViewers()) return;

  window.CI360._viewers.forEach(viewer => { viewer.destroy(); });

  window.CI360._viewers = [];
}

function getActiveIndexByID(id, oriantation) {
  if (isNoViewers()) return;

  let currentViewer = window.CI360._viewers.filter(viewer => viewer.id === id)[0];

  if (oriantation === 'y') {
    return currentViewer && (currentViewer.activeImageY - 1);
  }

  return currentViewer && (currentViewer.activeImageX - 1);
}

function add(id) {
  const view360Array = Array.from(document.querySelectorAll('.cloudimage-360:not(.initialized)'));

  if (view360Array.length && id) {
    const newViewContainer = view360Array.filter(viewer => viewer.id === id)[0];

    newViewContainer && window.CI360._viewers.push(new CI360Viewer(newViewContainer));
  }
}

function update(id = null, forceUpdate = false) {
  if (id) {
    const view = window.CI360._viewers.filter(viewer => viewer.id === id)[0];
    view.updateView(forceUpdate, window.CI360._viewers);
  } else {
    window.CI360._viewers
      .forEach(viewer => { viewer.updateView(forceUpdate, window.CI360._viewers); });
  }
}

function isNoViewers() {
  return !(window.CI360._viewers && window.CI360._viewers.length > 0);
}

window.CI360 = window.CI360 || {};
window.CI360.init = init;
window.CI360.destroy = destroy;
window.CI360.getActiveIndexByID = getActiveIndexByID;
window.CI360.update = update;
window.CI360.add = add;

if (!window.CI360.notInitOnLoad) {
  init();
}