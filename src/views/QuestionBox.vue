<template>
    <div>
        <h1>Question box</h1>
        <h3>{{question.question}}</h3> 
        <v-container class="v-example">
            <v-row>
                <v-col>
                    <h5>{{question.correct_answer}}</h5>
                </v-col>
            </v-row>
        </v-container>    
    </div>
</template>


<script>
export default {
    props: {
        question: Object,
    }
}
</script>