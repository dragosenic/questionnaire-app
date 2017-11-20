import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import Ember from 'ember';

export default Controller.extend({

    currentQuestion: 1,
    questionsAnswered: 0,

    progressBarStylePosition: new Ember.String.htmlSafe("width: 0%"),
    questionStylePosition : new Ember.String.htmlSafe("margin-top: 75px"),

    actions: {
        showNext() {
            let questionsCount = this.get("questionsCount");
            if (this.currentQuestion < questionsCount) {
                this.set('currentQuestion', this.currentQuestion + 1);
                let offset = 75 + (this.currentQuestion === questionsCount ? -75 : 0);
                this.set(
                    'questionStylePosition',
                    new Ember.String.htmlSafe("margin-top:" + (-(this.currentQuestion - 1) * 250 + offset) + "px"));

                this.updateProgressBar(this.currentQuestion);
            }
        },
        showPrevious() {
            if (this.currentQuestion > 1) {
                let offset = 75;
                this.set('currentQuestion', this.currentQuestion - 1);
                this.set(
                  'questionStylePosition',
                  new Ember.String.htmlSafe("margin-top:" + (-(this.currentQuestion - 1) * 250 + offset) + "px"));
            }
        },
        chooseTheAnswer(questionIndex, choiceIndex, currentQuestion) {
            if (questionIndex + 1 != currentQuestion) {
                return;
            }

            var choices = this.get('model').questionnaire.questions[questionIndex].choices;
            for (var i = 0; i < choices.length; i++) {
                if (i != choiceIndex) {
                    Ember.set(choices[i], 'selected', false);
                } else {
                    Ember.set(choices[i], 'selected', true);
                }  
            }

            this.updateProgressBar(currentQuestion);
        },
        submitForm() {
          alert("ok");
        }
    },

    questionsCount: computed(function() {
      let questionsCount =
        this.get('model').questionnaire.questions.length;

      return questionsCount;
    }),

    getQuestionsAnswered: function (currentQuestion) {
      var answeredCount = 0;
      var questions = this.get('model').questionnaire.questions;
      for (var qi = 0; qi < questions.length; qi++) {
        if (questions[qi].question_type === "multiple-choice") {
          var choices = questions[qi].choices;
          for (var ci = 0; ci < choices.length; ci++) {
            if (choices[ci].selected) {
              answeredCount++;
              break;
            }
          }
        } else if (questions[qi].description || qi <= (currentQuestion - 1)) {
          answeredCount++;
          Ember.set(questions[qi], 'description', ' ');
        }
      } 
      return answeredCount;
    },

    updateProgressBar: function (currentQuestion) {
      this.set("questionsAnswered", this.getQuestionsAnswered(currentQuestion));
      this.set(
        'progressBarStylePosition',
        new Ember.String.htmlSafe(
          "width:" + Math.round(100 * this.get("questionsAnswered") / this.get("questionsCount")) + "%"));
    },
});
