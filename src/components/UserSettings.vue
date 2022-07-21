<template>
    <v-container>
        <!-- make three rows -->
        <!-- this row will be show the users tragets -->
        <v-row>
            <v-card
            max-height="64">
                <v-card-text>Energy Target &emsp;&emsp;&emsp;&emsp;3000&emsp;Maintenance Target &emsp;&emsp;&emsp;&emsp;3000</v-card-text>
            </v-card>
        </v-row>
        <!-- this row will be inputs for the user -->
        <v-row>
            <!-- make two columbs -->
            <!-- this col is made so the user can input their stats -->
            <v-col>
                <v-card>
                    <v-list>
                        <v-list-item
                        v-for="(option,i) in inputOptions"
                        :key="i"
                        >
                            <div v-if="option.formType === 'text'">
                                <v-text-field v-if="option.text === 'Current Weight'"
                                label="Current Weight"
                                ></v-text-field>
                                <v-text-field v-if="option.text === 'Height'"
                                label="Height"
                                ></v-text-field>
                            </div>
                            <div v-if="option.formType === 'Overflow'">Overflow</div>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <template>
                        <v-row class="fill-height">
                            <v-col>
                                <!-- Set up the actual calendar, so start with a sheet -->
                                <v-sheet height="300">
                                    <!-- Get a menu when ever you click on an even -->
                                    <template>
                                        <v-row>
                                            <v-col
                                            cols="12"
                                            sm="6"
                                            >
                                            <v-date-picker
                                                v-model="dates"
                                                range
                                            ></v-date-picker>
                                            </v-col>
                                            <v-col
                                            cols="12"
                                            sm="6"
                                            >
                                            <v-text-field
                                                v-model="dateRangeText"
                                                label="Date range"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                            ></v-text-field>
                                            model: {{ dates }}
                                            </v-col>
                                        </v-row>
                                    </template>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </template>
                </v-card>
            </v-col>
        </v-row>
        <!-- this row will contain the advanced settings -->
        <v-row>
            <template>
                <div>
                    <div class="text-center d-flex pb-4">
                    <v-btn @click="all">
                        Advanced Settings
                    </v-btn>
                    </div>

                    <v-expansion-panels
                    v-model="panel"
                    multiple
                    >
                        <v-expansion-panel
                            v-for="(item,i) in items"
                            :key="i"
                        >
                            <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>  
            </template>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        inputOptions: [
            { formType:'text', text: 'Current Weight', inputName: ''},
            { formType:'text', text: 'Height', inputName: ''},
            { formType:'Overflow', text: 'Active Days Per Week', inputName: ''},
            { formType:'Overflow', text: 'Gender', inputName: ''},
            { formType:'Overflow', text: 'Goal', inputName: ''},
        ],
        panel: [],
        items: 5,
        focus:'',
        type: 'month',
        typeToLable:{
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['yellow', 'green'],
        names: ['grocery day', 'planned meals'],
        weights: [152,153,150,152,154,154,155],
        dayCarousel:[
            {slideHeading:"Breakfast", color:"grey"},
            {slideHeading:"Lunch", color:"white"},
            {slideHeading:"Dinner", color:"grey"},
            {slideHeading:"Snacks", color:"white"},
        ],
        dates: ['2022-09-10', '2022-09-20'],
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    props: () => ({
        propInputOptions: [
            { formType:'text', text: 'Current Weight', inputName: ''},
            { formType:'text', text: 'Height', inputName: ''},
            { formType:'Overflow', text: 'Active Days Per Week', inputName: ''},
            { formType:'Overflow', text: 'Gender', inputName: ''},
            { formType:'Overflow', text: 'Goal', inputName: ''},
        ],
    }),
    mounted(){
        this.$refs.calendar.checkChange()
    },
    methods:{
        viewDay ({ date }){
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event){
            return event.color
        },
        setToday(){
            this.focus = ''
        },
        prev (){
            this.$refs.calendar.prev()
        },
        next (){
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event}){
            const open = () =>{
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen){
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            }else{
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange({ start, end }){
            const events = []

            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = this.rnd(days, days + 20)

            for(let i = 0; i < eventCount; i++){
                const allDay = this.rnd(0,3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimeStamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimeStamp)

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay
                })
            }

            this.events = events
        },
        rnd (a, b){
            return Math.floor((b -a + 1) * Math.random()) + a
        },
        all () {
            this.panel = [...Array(this.items).keys()].map((k, i) => i)
        },
        // Reset the panel
        none () {
            this.panel = []
        },
    },
}
</script>

<style>

</style>