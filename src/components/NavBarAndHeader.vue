<template>
    <nav>
        <v-card
        class="overflow-hidden"
        >
            <v-app-bar
            elevate-on-scroll
            color="grey"
            app>
                <!-- Make Navigation Bar and click action -->
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <!-- This will be a fare and balanced logo eventally -->
                <v-toolbar-title>Fare & Balanced</v-toolbar-title>
                
                <v-spacer></v-spacer>
                <!-- The current tab could be displayed -->

                <!-- Display the users avatar and display three dots -->
                <v-btn
                icon>
                    <v-avatar
                    color="primary"

                    >
                        <v-icon>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-app-bar>
        </v-card>
        
        <!-- set up the display of the navigation bar -->
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        app>
            <!-- make the list of the option in the navagtion bar -->
            <v-list
            nav
            dense>
                <v-subheader>MAIN MENU</v-subheader>
                <v-list-item 
                v-for="(link, i) in navLinks"
                :key="i"
                :to="link.route"
                link
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data: () => ({
        navLinks: [
            { text: 'Dashboard', icon: 'mdi-home', route: '/'},
            { text: 'Settings', icon: 'mdi-clock', route: '/settings'},
            { text: 'Meal Plans', icon: 'mdi-account',route: '/meal_plans' },
            { text: 'Recipes', icon: 'mdi-account',route: '/recipes' },
            { text: 'Grocery List', icon: 'mdi-flag', route: '/grocery_list' },
            { text: 'Analysis', icon: 'mdi-flag', route: '/analysis' },
            { text: 'Blog', icon: 'mdi-flag', route: '/blog' },
            { text: 'Support', icon: 'mdi-flag', route: '/support' },
            { text: 'Donate', icon: 'mdi-flag', route: '/donate' },
            { text: 'Logout', icon: 'mdi-flag', route: '/logout' },
        ],
        drawer: false,
        group: null,
        }),
        watch: {
            group () {
                this.drawer = false
           },
        },
}
</script>

<style>

</style>