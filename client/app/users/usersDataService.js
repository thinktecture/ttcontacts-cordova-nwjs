(function () {
    'use strict';

    function UsersDataService($q) {
        var users = [
            {
                firstName: 'Ingo',
                lastName: 'Rammer',
                email: 'ingo.rammer@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-1',
                content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
            },
            {
                firstName: 'Christian',
                lastName: 'Weyer',
                email: 'christian.weyer@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-2',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            },
            {
                firstName: 'Marco',
                lastName: 'Frodl',
                email: 'marco.frodl@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-9',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            },
            {
                firstName: 'Dominick',
                lastName: 'Baier',
                email: 'dominick.baier@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-3',
                content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumbersexual Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
            },
            {
                firstName: 'Thomas',
                lastName: 'Hilzendegen',
                email: 'thomas.hilzendegen@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-4',
                content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
            },
            {
                firstName: 'Pawel',
                lastName: 'Gerr',
                email: 'pawel.gerr@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-5',
                content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
            },
            {
                firstName: 'Steffen',
                lastName: 'Jahr',
                email: 'steffen.jahr@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-6',
                content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
            },
            {
                firstName: 'Manuel',
                lastName: 'Rauber',
                email: 'manuel.rauber@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-7',
                content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
            },
            {
                firstName: 'Christian',
                lastName: 'Liebel',
                email: 'christian.liebel@thinktecture.com',
                phone: '+49 721 7540380',
                avatar: 'svg-8',
                content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
            }
        ];

        return {
            loadAll: function () {
                return $q.when(users);
            }
        };
    }

    app.module.service('usersDataService', UsersDataService);
})();
