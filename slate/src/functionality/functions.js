class GlobalFunctions{
    constructor(name) {
        this.name = name;
    }

    transitions() {
        let that = this;

        let triggers = '[data-animation="inview-fade-in"], [data-animation="inview-fade-up"], [data-animation="inview-fade-down"], [data-animation="inview-slide-left"], [data-animation="inview-slide-right"], [data-animation="inview-scale-in"], [data-animation="inview-scale-down"]';

        let cascadeTriggers = '[data-animation="inview-cascade-fade-in"], [data-animation="inview-cascade-fade-up"], [data-animation="inview-cascade-fade-down"], [data-animation="inview-cascade-slide-left"], [data-animation="inview-cascade-slide-right"], [data-animation="inview-cascade-scale-in"]';

        document.querySelectorAll(cascadeTriggers).forEach(function(element) {
            let desc = Array.prototype.slice.call(element.children);
            desc.forEach(function(elem, i) {
                let delay = i * 150;
                if (delay) {
                    elem.style.transitionDelay = delay + 'ms';
                }
            })
        })

        that.inView(triggers, "entry.target.setAttribute('data-inview', true)", "entry.target.setAttribute('data-inview', false)");

        that.inView(cascadeTriggers, "entry.target.setAttribute('data-inview', true)", "entry.target.setAttribute('data-inview', false)");

    }

    inView(el, functionIn, functionOut) {
        document.querySelectorAll(el).forEach(function(element) {
            let options = {
                root: null,
                rootMargin: '30px',
                threshold: 0
            } 
            let observer = new IntersectionObserver(onIntersection, options);

            function onIntersection(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        // eslint-disable-next-line
                        eval(functionIn)
                    } else {
                        // eslint-disable-next-line
                        eval(functionOut)
                    }
                })
            }
            observer.observe(element)
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let siteFunctions = new GlobalFunctions();

    siteFunctions.transitions();
    siteFunctions.inView();
})