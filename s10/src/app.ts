/* eslint-disable @typescript-eslint/triple-slash-reference */
// S9L143 Working with Namespace
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

// S9L122 Drag and drop start
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");

  // S9L144 Organizing files & folders
  // S9L145 Import optimization for every file
}
