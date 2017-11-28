angular.module('app')
.factory('pageService',
         [pageService]);

function pageService() {

   return {
     getPager : function(totleItem, currentPage, pageSize) {

       // default to first page
       currentPage = currentPage || 1;

       // default page size is 10
       pageSize = pageSize || 10;

       // calculate total pages
       var totalPage = Math.ceil(totalItem / pageSize);

       var startPage, endPage;
       if (totalPage <= 10) {
           // less than 10 total pages so show all
           startPage = 1;
           endPage = totalPage;
       } else {
           // more than 10 total pages so calculate start and end pages
           if (currentPage <= 6) {
               startPage = 1;
               endPage = 10;
           } else if (currentPage + 4 >= totalPages) {
               startPage = totalPage - 9;
               endPage = totalPages;
           } else {
               startPage = currentPage - 5;
               endPage = currentPage + 4;
           }
       }

       // calculate start and end item indexes
       var startIndex = (currentPage - 1) * pageSize;
       var endIndex = Math.min(startIndex + pageSize - 1, totalItem - 1);

       // create an array of pages to ng-repeat in the pager control
       var page = _.range(startPage, endPage + 1);

       // return object with all pager properties required by the view
       return {
         totalItem: totalItem,
         currentPage: currentPage,
         pageSize: pageSize,
         totalPage: totalPage,
         startPage: startPage,
         endPage: endPage,
         startIndex: startIndex,
         endIndex: endIndex,
         page: page
       };
     }
   }
 }
