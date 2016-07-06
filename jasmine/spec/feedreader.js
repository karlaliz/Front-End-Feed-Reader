/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined and is no empty', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                console.log(allFeeds[i].url)
                expect(allFeeds[i].url.length).toBeTruthy();
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and is not empty', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeTruthy();
            }
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);;
        });
    });

          
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('should have at least a single .entry element within the .feed container', function(){
            expect($('.feed.entry').length).toBeGreaterThan(0);
        });
    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.*/
        var feedCur, feedNew;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedCur = $('.feed').text();
                done();
            });
        });
                
        it('a new feed is loaded', function(done) {
            loadFeed(1, function(){
                feedNew = $('.feed').text(); 
                expect(feedNew).not.toBe(feedCur);
                done();
            });
        }); 
    });


}());
