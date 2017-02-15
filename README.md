# aurelia-crumbs

This is an aurelia breadcrumbs widget conceived as a custom element that renders your application router's active navigation instruction chain.

## Getting Started

Download from npm:
```shell
  npm install aurelia-crumbs
  ```

In your applications main file:
```javascript
aurelia.use
        .plugin('aurelia-crumbs')
        ...
```

In your route declarations (that you pass to your router), you can now include an option breadcrumb property:
```javascript

const routes: [
    {
        route: ['route1'],
        name: 'route1',
        moduleId: './routes/route1/route1',
        title: 'Route 1',
        breadcrumb: true
    },    
    {
        route: ['route2'],
        name: 'route2',
        moduleId: './routes/route2/route2',
        title: 'Route 2',
        breadcrumb: true
    }
];

export class App {

    ...

    configureRouter(routerConfig, router) {
        routerConfig.options.pushState = true;
        routerConfig.map(routes);

        this.registerNavigationSteps(routerConfig);

        this.router = router;
    }
    
    ...
}
```

In order for a route to be rendered by the breadcrumb widget, the route's config have breadcrumb === true and a truthy title.

Then, add the custom element somewhere in your application:
```html
  <aurelia-crumbs config.bind="config"></aurelia-crumbs>
  ```


## Configuration
The widget takes an optional config object which has one parameter:
1) Separator: valid html string.

## Dynamic route titles

If you want to dynamically change a route title in the widget, you can do the following:
```javascript
@inject(AureliaRouter)
export class SomeRoute {
    constructor(router) {
        this.router = router;
    }
    
    attached() {
        this.router.currentInstruction.config.title = 'New Title';
    }
}
```
