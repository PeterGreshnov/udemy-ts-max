/* eslint-disable @typescript-eslint/triple-slash-reference */
// S9L143 Working with Namespace

/// <reference path="models/drag-n-drop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="components/base-component.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-item.ts" />
/// <reference path="components/project-list.ts" />

// S9L122 Drag and drop start
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");

  // S9L144 Organizing files & folders
}
