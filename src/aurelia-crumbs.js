/**
 * Created by istrauss on 11/15/2016.
 */

import './aurelia-crumbs.css';
import _clone from 'lodash/clone';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router, EventAggregator)
export class AureliaCrumbsCustomElement {

    /**
     * Configuration object
     * @type {{seperator: 'htmlString'}}
     */
    @bindable config = {};

    constructor(router, eventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
    }

    attached() {
        this.subscription = this.eventAggregator.subscribe('router:navigation:success', this.refresh.bind(this));
        this.refresh();
    }

    detached() {
        this.subscription.dispose();
    }

  /**
   * Refresh the rendered widget
   */
    refresh() {
        const parentInstructions = this.getParentInstructions(this.router.currentInstruction);
        this.instructions = parentInstructions
            .slice(0, parentInstructions.length - 1)
            .concat(this.router.currentInstruction.getAllInstructions())
            .filter(instruction => instruction.config.breadcrumb && instruction.config.title);
    }

    navigateToRoute(instruction) {
        const params = _clone(instruction.params);
        delete params.childRoute;
        instruction.router.navigateToRoute(instruction.config.name, params);
    }

    getParentInstructions(instruction) {
        return instruction.parentInstruction ? this.getParentInstructions(instruction.parentInstruction).concat([instruction]) : [instruction];
    }
}
