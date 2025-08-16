import { MathTrainer } from "./mathTrainer.mjs";

export default class HearMathTrainer extends MathTrainer {
  constructor(wordLists) {
    super(wordLists)
  }

  speak(text) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(this.withoutAnswer(text))
    utterance.rate = 0.8;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  showWords() {
    const container = document.getElementById('responseOptions')
    container.innerHTML = '';
    const wordButtons = [
      ...Array(10).keys(),
      this.correctWord(),
      this.randomIncorrectWord()
    ].sort(() => Math.random() - 0.5).map(word => {
      let result = null;
      if (Number.isInteger(word)) {
        result = document.createElement('div')
      } else {
        result = document.createElement('button')
        result.innerHTML = this.answerOnly(word);
        result['ontouchstart' in window ? 'ontouchstart' : 'onclick'] = (() => this.checkWord(word, result)).bind(this)
      }
      result.id = `word-${word}`
      result.className = 'response-option'
      return result
    })
    container.append(...wordButtons)

    Object.keys(this.timings).forEach(key => this.timings[key] += 500)
  }
}
