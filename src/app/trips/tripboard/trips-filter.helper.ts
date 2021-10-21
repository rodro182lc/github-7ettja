import {
  FilteringExpressionsTree,
  FilteringLogic
} from '@infragistics/igniteui-angular';
import { TripCategoryFilter } from '../enumerations/trip-category-filter.enum';
import { TripGridColumn } from '../enumerations/trip-grid-column.enum';
import {
  IgxDateFilteringOperand,
  IgxStringFilteringOperand
} from '@infragistics/igniteui-angular';

import { Events, EVENTS } from '../enumerations/events.enum';

export abstract class TripsFilterHelper {
  /**
   * Gets an specific expression tree to only show grid records that meet proper criteria for the selected category
   * @param categoryToFilterBy - Category that determines the criteria to be applied to filter records
   */
  static filterByCategoryExpressionTree(
    categoryToFilterBy: TripCategoryFilter
  ): FilteringExpressionsTree {
    const categoryExpTree = new FilteringExpressionsTree(FilteringLogic.And);

    switch (categoryToFilterBy) {
      case TripCategoryFilter.OverDue:
        this.addOverDueExpression(categoryExpTree);
        break;

      case TripCategoryFilter.LateForDel:
        this.addOverDueExpression(categoryExpTree);
        this.addLateForDeliveryExpression(categoryExpTree);
        break;

      case TripCategoryFilter.LateForPU:
        this.addOverDueExpression(categoryExpTree);
        this.addLateForPickUpExpression(categoryExpTree);
        break;
      case TripCategoryFilter.ETALessThan30:
        this.addEtaExpression(categoryExpTree);
        break;
    }

    return categoryExpTree;
  }

  /**
   *
   * @param categoryExpTree FilteringExpressionsTree for which Overdue expression needed to be added
   * @returns FilteringExpressionsTree with OverDue Expression
   */
  static addOverDueExpression(categoryExpTree: FilteringExpressionsTree): void {
    const currentDate = new Date();
    const overdueExpression = {
      condition: IgxDateFilteringOperand.instance().condition('before'),
      fieldName: TripGridColumn.NextDate,
      searchVal: currentDate
    };
    categoryExpTree.filteringOperands.push(overdueExpression);
  }

  /**
   *
   * @param categoryExpTree FilteringExpressionsTree for which LateForDelivery expression needed to be added
   * @returns FilteringExpressionsTree with LateForDelivery Expression
   */
  static addLateForDeliveryExpression(
    categoryExpTree: FilteringExpressionsTree
  ): void {
    const lateForDeliveryExpression = {
      condition: IgxStringFilteringOperand.instance().condition('equals'),
      fieldName: TripGridColumn.NextEvent,
      searchVal: EVENTS.find((event) => event.key === Events.Deliver)?.value,
      ignoreCase: true
    };

    categoryExpTree.filteringOperands.push(lateForDeliveryExpression);
  }

  /**
   *
   * @param categoryExpTree FilteringExpressionsTree for which LateForDelivery expression needed to be added
   * @returns FilteringExpressionsTree with LateForDelivery Expression
   */
  static addLateForPickUpExpression(
    categoryExpTree: FilteringExpressionsTree
  ): void {
    const lateForPickUpExpression = {
      condition: IgxStringFilteringOperand.instance().condition('equals'),
      fieldName: TripGridColumn.NextEvent,
      searchVal: EVENTS.find((event) => event.key === Events.Pickup)?.value,
      ignoreCase: true
    };

    categoryExpTree.filteringOperands.push(lateForPickUpExpression);
  }

  /**
   *
   * @param categoryExpTree FilteringExpressionsTree for which ETA Less Than 30 expression needed to be added
   * @returns FilteringExpressionsTree with ETA Expression
   */
  static addEtaExpression(categoryExpTree: FilteringExpressionsTree): void {
    const fieldExpTree = new FilteringExpressionsTree(FilteringLogic.And);
    const now = new Date();
    const thirtyMinInMs = 30 * 60 * 1000;
    const nowPlus30Min = new Date(now.getTime() + thirtyMinInMs + 1); // Plus one extra ms to use before operand and not beforeOrEqual

    const etaAfterNow = {
      condition: IgxDateFilteringOperand.instance().condition('after'),
      fieldName: TripGridColumn.NextEventETA,
      searchVal: now
    };
    const etaBeforeNowPlus30Min = {
      condition: IgxDateFilteringOperand.instance().condition('before'),
      fieldName: TripGridColumn.NextEventETA,
      searchVal: nowPlus30Min
    };
    fieldExpTree.filteringOperands.push(etaAfterNow);
    fieldExpTree.filteringOperands.push(etaBeforeNowPlus30Min);
    categoryExpTree.filteringOperands.push(fieldExpTree);
  }
}
