"use client";
import React, { useState } from 'react';

export default function ContactView() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { fullName: '', email: '', message: '' };

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nama lengkap wajib diisi';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email address wajib diisi';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Pesan wajib diisi';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            setIsSubmitting(true);
            
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                setFormData({ fullName: '', email: '', message: '' }); // Reset form
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    setIsSuccess(false);
                }, 5000);
            }, 1500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Enforce max length for message
        if (name === 'message' && value.length > 500) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <>
            <article className="main-content min-w-0" style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>
                <div className="container-fluid px-lg-15 px-md-10 px-6 py-10">
                    
                    <div className="text-center mb-12 mt-8">
                        <h1 className="display-four text-white fw-bold mb-4">We're Here to Help</h1>
                        <p className="tcn-6 fs-lg">
                            Kami biasanya membalas dalam 1×24 jam di hari kerja.
                        </p>
                    </div>

                    <div className="row g-6 justify-content-center">
                        {/* Left Side: Info Cards */}
                        <div className="col-lg-5 col-md-12">
                            <div className="row g-4">
                                {/* Card 1 */}
                                <div className="col-sm-6">
                                    <div className="info-card p-6 rounded-4 h-100 d-flex flex-column align-items-start" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
                                        <div className="icon-circle mb-4 d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#F6471C' }}>
                                            <i className="ti ti-phone text-white fs-4"></i>
                                        </div>
                                        <h4 className="text-white mb-2 fs-5">Call Us</h4>
                                        <p className="tcn-6 mb-0">+62 812-3456-7890</p>
                                        <p className="tcn-6 mb-0">Senin - Jumat</p>
                                        <p className="tcn-6 mb-0">08.00 - 17.00</p>
                                    </div>
                                </div>
                                
                                {/* Card 2 */}
                                <div className="col-sm-6">
                                    <div className="info-card p-6 rounded-4 h-100 d-flex flex-column align-items-start" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
                                        <div className="icon-circle mb-4 d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#F6471C' }}>
                                            <i className="ti ti-mail text-white fs-4"></i>
                                        </div>
                                        <h4 className="text-white mb-2 fs-5">Email Us</h4>
                                        <p className="tcn-6 mb-0">info@gameforsmart.com</p>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="col-sm-6">
                                    <div className="info-card p-6 rounded-4 h-100 d-flex flex-column align-items-start" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
                                        <div className="icon-circle mb-4 d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#F6471C' }}>
                                            <i className="ti ti-map-pin text-white fs-4"></i>
                                        </div>
                                        <h4 className="text-white mb-2 fs-5">Visit Us</h4>
                                        <p className="tcn-6 mb-0">Malang Raya, Jawa Timur, Indonesia</p>
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="col-sm-6">
                                    <div className="info-card p-6 rounded-4 h-100 d-flex flex-column align-items-start" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
                                        <div className="icon-circle mb-4 d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#F6471C' }}>
                                            <i className="ti ti-messages text-white fs-4"></i>
                                        </div>
                                        <h4 className="text-white mb-2 fs-5">Live Chat & FAQ</h4>
                                        <p className="tcn-6 mb-0">Temukan jawaban instan di FAQ atau chat dengan admin kami.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="col-lg-7 col-md-12">
                            <div className="form-card p-8 rounded-4" style={{ backgroundColor: '#111111', border: '1px solid #333' }}>
                                <h3 className="text-white mb-6 fs-3">Get in Touch with Us</h3>
                                
                                {isSuccess && (
                                    <div className="success-message mb-6 p-4 rounded-3 d-flex align-items-center gap-3">
                                        <div className="success-icon d-flex align-items-center justify-content-center rounded-circle" style={{ width: '24px', height: '24px', backgroundColor: '#22c55e' }}>
                                            <i className="ti ti-check text-white" style={{ fontSize: '14px' }}></i>
                                        </div>
                                        <span className="text-white fw-medium">Pesan terkirim! Kami akan membalas dalam 1×24 jam.</span>
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4 mb-6">
                                        <div className="col-md-6">
                                            <label className="form-label tcn-1 fw-medium mb-2">Full Name *</label>
                                            <input 
                                                type="text" 
                                                name="fullName"
                                                className={`form-control custom-input ${errors.fullName ? 'is-invalid' : ''}`} 
                                                placeholder="Type Full Name" 
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            {errors.fullName && <div className="error-text mt-2">{errors.fullName}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label tcn-1 fw-medium mb-2">Email Address *</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                className={`form-control custom-input ${errors.email ? 'is-invalid' : ''}`} 
                                                placeholder="Type Email Address" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                            />
                                            {errors.email && <div className="error-text mt-2">{errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="mb-6 position-relative">
                                        <label className="form-label tcn-1 fw-medium mb-2">Message</label>
                                        <textarea 
                                            name="message"
                                            className={`form-control custom-input ${errors.message ? 'is-invalid' : ''}`} 
                                            rows={6} 
                                            style={{ resize: 'vertical' }} 
                                            placeholder="Let us know how we can help you."
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        ></textarea>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <div>
                                                {errors.message && <div className="error-text m-0">{errors.message}</div>}
                                            </div>
                                            <div className="character-counter fs-sm" style={{ color: formData.message.length >= 500 ? '#ef4444' : '#666' }}>
                                                {formData.message.length} / 500 karakter
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn w-100 py-3 rounded-pill fw-bold text-white transition-all hover-scale d-flex align-items-center justify-content-center gap-2" 
                                        style={{ backgroundColor: '#F6471C', border: 'none', opacity: isSubmitting ? 0.7 : 1 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                    
                                    <p className="tcn-6 mt-4 fs-sm text-center">
                                        By submitting, I agree to the <a href="#" style={{ color: '#F6471C' }}>Privacy Policy</a>.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .custom-input {
                        background-color: #1a1a1a !important;
                        border: 1px solid #333 !important;
                        color: white !important;
                        border-radius: 8px;
                        padding: 0.75rem 1rem;
                        transition: all 0.3s ease;
                    }
                    .custom-input:focus {
                        border-color: #F6471C !important;
                        box-shadow: 0 0 0 2px rgba(255, 140, 0, 0.2) !important;
                        outline: none;
                    }
                    .custom-input.is-invalid {
                        border-color: #ef4444 !important;
                    }
                    .custom-input.is-invalid:focus {
                        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
                    }
                    .custom-input::placeholder {
                        color: #666 !important;
                    }
                    .error-text {
                        color: #ef4444;
                        font-size: 0.875rem;
                    }
                    .success-message {
                        background-color: rgba(34, 197, 94, 0.1);
                        border: 1px solid rgba(34, 197, 94, 0.2);
                    }
                    .hover-scale {
                        transition: all 0.3s ease;
                    }
                    .hover-scale:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
                    }
                `}</style>
            </article>
        </>
    );
}
