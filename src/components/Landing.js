import React, { Component } from 'react';
import { connect } from 'react-redux';
import animateScrollTo from 'animated-scroll-to';
import axios from 'axios';
import { landingEditField, landingValidate, landingSetStatus } from '../actions/landing'

class Landing extends Component {
    componentDidMount = () => {
        axios.get('http://localhost:5000/api/requests/wakeup')
        .then(res => {
        })
        .catch(err => {
        });
    }
    handleGoToSubscription = () => {
        animateScrollTo(this.subscription);
        console.log(process)
    }
    secondValidation = () => {
        if (!this.props.login.valid) {
            this.frontValidation()
        }
    }
    frontValidation = () => {
        const validateEmail = (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase().trim());
        }
        let errors = {
            email: ''
        };
        let valid = true;
        if (!validateEmail(this.props.landing.fields.email)) {
            errors.email = 'Email is invalid.';
            valid = false;
        }
        this.props.landingValidate(errors, valid);
        return valid;
    }
    sendEmail = (e) => {
        e.preventDefault();
        if (this.frontValidation()) {
            this.props.landingSetStatus('loading');
            let data = {
                service: 'wirtualnyparagon',
                email: this.props.landing.fields.email
            }
            axios.post('http://localhost:5000/api/requests/subscribe', data)
                .then(res => {
                    this.props.landingSetStatus('subscribed');
                })
                .catch(err => {
                    this.props.landingValidate(err.response.data, true);
                    this.props.landingSetStatus('ready');
                });
        }
    }
    render = () => {
        return (
            <div id="landing">
                <header className='header'>
                    <div className='navbar'>
                        <div className='navbar-inner'>
                            <div className='logo' />
                        </div>
                    </div>
                    <div className='header-main'>
                        <div className='main left'>
                            <div className='main-inner'>
                                <div className='title'>
                                    Paragony dla biznesu online
                        </div>
                                <div className='description'>
                                    Automatycznie wystawiaj paragony przy sprzedaży produktów przez Internet.
                        </div>
                                <button onClick={this.handleGoToSubscription}>Wyraź zainteresowanie</button>
                            </div>
                        </div>
                        <div className='main right'>
                            <div className='receipt' />
                        </div>
                    </div>
                </header>
                <section className='goal'>
                    <div className='goal-inner'>
                        <div className='title'>
                            Zautomatyzuj proces fiskalizacji swojej sprzedaży online
                        </div>
                        <div className='description'>
                            Wirtualny Paragon jest kasą fiskalną w postaci API. Jest interfejsem przyjaznym dla przedsiębiorców i programistów. Powstające we współpracy z Ministerstwem Finansów rozwiązanie pozwala cyfrowym biznesom pominąć proces manualnego ewidencjonowania sprzedaży.
                        </div>
                        <hr />
                        <button onClick={this.handleGoToSubscription}>Wyraź zainteresowanie</button>
                    </div>
                </section>
                <section className='roll'>
                    <img src='./paper-roll.svg' alt='paper-roll'/>
                </section>
                <section className='usage'>
                    <div className='usage-inner'>
                        <div className='title'>
                            Zastosowania wirtualnych paragonów
                        </div>
                        <div className='description'>
                            Poniżej przedstawiamy kilka rodzajów produktów w których zastosowanie znajduje automatyzacja procesu fiskalizacji.
                        </div>
                    </div>
                    <div className='usage-examples'>
                        <div className='example'>
                            <div className='title'>
                                Sklepy internetowe
                        </div>
                            <div className='description'>
                                Jeśli prowadzisz sklep online, wystawiaj Wirtualne Paragony automatycznie przy każdym zakupie.
                        </div>
                        </div>
                        <div className='example'>
                            <div className='title'>
                                SAAS
                        </div>
                            <div className='description'>
                                Zastosuj Wirtualne Paragony do aplikacji z płatnościami pomiędzy różnymi podmiotami (np Uber Eats, Glovo).
                        </div>
                        </div>
                        <div className='example'>
                            <div className='title'>
                                POS
                        </div>
                            <div className='description'>
                                Rozwiń swój system sprzedaży zastępując tradycyjne paragony elektronicznymi.
                        </div>
                        </div>
                    </div>
                    <section className='subscription'>
                        <div className={`subscription-inner ${this.props.landing.status === 'subscribed' ? 'subscribed' : ''}`}>
                            <div className='title' ref={div => this.subscription = div}>
                                Wyraź swoje zainteresowanie
                        </div>
                            <div className='description'>
                                Pozostaw nam swój adres email, a damy Ci znać gdy tylko prace legislacyjne i wdrożeniowe zostaną zakończone
                        </div>
                            <div className={`input-wrapper ${this.props.landing.errors.email !== '' ? 'error' : ''}`}>
                                <input type='text' value={this.props.landing.fields.email} onChange={e => this.props.landingEditField({ email: e.target.value })} placeholder='Adres email'/>
                                <div className={'error-text'}>{this.props.landing.errors.email}</div>
                            </div>
                            <div className={'button-wrapper'}>
                                {this.props.landing.status === 'loading' ? <button className='loading'>Saving...</button> : <button onClick={this.sendEmail}>Wyślij</button>}
                            </div>
                            <div className='policy-note'>
                                Klikając “Wyślij” wyrażasz zgodę na otrzymywanie drogą elektroniczną na wskazany adres e-mail informacji
                                handlowej w rozumieniu art. 10 ust. 1 ustawy z dnia 18 lipca 2002 roku o świadczeniu usług drogą elektroniczną od Wirtualny Paragon
                        </div>
                            <div className='success'>
                                <div>Dziękujemy! Damy Ci znać niezwłocznie gdy będziemy gotowi.</div>
                                <button onClick={()=> this.props.landingSetStatus('ready')}>Wróć</button>
                            </div>
                        </div>
                    </section>
                </section>
                <section className='footer'>
                    <div className='logo' />
                    <div className='contact'>
                        <div className='title'>
                            Kontakt
                        </div>
                        <div className='value'>
                            kontakt@wirtualnyparagon.pl
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    landing: state.landing
})
const mapDispatchToProps = {
    landingEditField,
    landingValidate,
    landingSetStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
