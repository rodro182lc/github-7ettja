import {
  FilteringExpressionsTree,
  FilteringLogic,
  IFilteringOperation,
  IgxGridComponent
} from '@infragistics/igniteui-angular';

export abstract class GridFilterHelper {
  /**
   * Gets an specific expression tree to only show grid records that contain the given filterText
   * @param filterText - Value to be searched in each grid column, if any grid column contains this text then the record will be shown
   */
  static filterByFieldExpressionTree(
    grid: IgxGridComponent,
    columnFilterConfig: Map<any, IFilteringOperation>,
    filterText: string
  ): FilteringExpressionsTree {
    const fieldsExpTree = new FilteringExpressionsTree(FilteringLogic.Or);
    grid.columns.forEach((igxColumn) => {
      // Only considering filterable columns
      if (!igxColumn.filterable) {
        return;
      }

      // Only considering visible columns
      if (igxColumn.hidden) {
        igxColumn.searchable = false;
        igxColumn.filterable = false;
        return;
      }

      // Getting the current column filtering configuration
      const filteringCondition = columnFilterConfig?.get(igxColumn.field);
      if (!filteringCondition) {
        return;
      }

      // Generating a new filtering expression for the trip column
      const currFieldExpTree = new FilteringExpressionsTree(
        FilteringLogic.Or,
        igxColumn.field
      );
      const currFieldExpression = {
        condition: filteringCondition,
        fieldName: igxColumn.field,
        ignoreCase: true,
        searchVal: filterText
      };
      currFieldExpTree.filteringOperands.push(currFieldExpression);
      fieldsExpTree.filteringOperands.push(currFieldExpTree);
    });

    return fieldsExpTree;
  }
}
