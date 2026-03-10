"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function AgreeCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '16px', cursor: 'pointer' }} onClick={() => setChecked(!checked)}>
            <div style={{
                width: '18px',
                height: '18px',
                minWidth: '18px',
                borderRadius: '50%',
                background: '#F6471C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: checked ? '0 0 10px rgba(246, 71, 28, 0.6)' : 'none',
            }}>
                {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <span style={{ color: '#aaa', fontSize: '14px', userSelect: 'none' }}>
                I agree with{' '}
                <a href="/privacy-policy" style={{ color: '#F6471C', textDecoration: 'underline' }} onClick={e => e.stopPropagation()}>Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms-condition" style={{ color: '#F6471C', textDecoration: 'underline' }} onClick={e => e.stopPropagation()}>Terms &amp; Conditions</a>
            </span>
        </div>
    );
}

export default function CTA() {
    const pathname = usePathname();
    
    // Hapus CTA pada halaman detail game atau kompetisi
    const isDetailPage = pathname.includes('/competitions/') || pathname.includes('/games/');
    
    if (isDetailPage) return null;

    return (
        <>
            <style>{`
                .cta-pill-container {
                    background: white;
                    border-radius: 100px;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .cta-input {
                    background: transparent !important;
                    border: none !important;
                    padding: 12px 24px !important;
                    color: #333 !important;
                    flex-grow: 1;
                    font-size: 16px;
                    outline: none !important;
                }
                .cta-input::placeholder {
                    color: #999 !important;
                }
                .cta-submit-btn {
                    background: #F6471C !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 100px !important;
                    padding: 12px 40px !important;
                    font-weight: 700 !important;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-transform: uppercase;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                }
                .cta-submit-btn:hover {
                    background: #ff5a2d !important;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(246, 71, 28, 0.4);
                }
                .stay-title {
                    font-weight: 800 !important;
                    font-size: 3.5rem !important;
                    color: white;
                }
                .stay-subtitle {
                    color: #999;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                @media (max-width: 768px) {
                    .stay-title { font-size: 2.5rem !important; }
                    .cta-pill-container { flex-direction: column; border-radius: 20px; padding: 15px; }
                    .cta-submit-btn { width: 100%; margin-top: 10px; }
                }
                #cta-card {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    margin: 0;
                    margin-bottom: -100px;
                    padding: 80px 40px 160px 40px;
                    border-radius: 0;
                    background: rgb(14, 16, 18);
                    border: none;
                    border-top: 1px solid rgba(255, 140, 0, 0.18);
                    box-shadow:
                        0 0 60px rgba(255, 100, 0, 0.07),
                        0 0 120px rgba(255, 80, 0, 0.04),
                        inset 0 1px 0 rgba(255, 255, 255, 0.04);
                }
                #cta-card::before {
                    content: '';
                    position: absolute;
                    top: -120px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 600px;
                    height: 400px;
                    background: radial-gradient(ellipse at center, rgba(255, 100, 0, 0.12) 0%, transparent 70%);
                    pointer-events: none;
                }
                @media (max-width: 991px) {
                    #cta-card {
                        margin-left: 0;
                        width: 100vw;
                        padding: 60px 24px 120px;
                    }
                }
            `}</style>

            {/* Newsletter CTA section */}
            <div id="cta-card">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="display-two mb-6 stay-title title-anim">Stay Up To Date</h2>
                            <p className="stay-subtitle mb-10 mx-auto max-600">
                                Get the latest gaming news, tournament updates, and exclusive<br className="d-none d-md-block" /> content delivered straight to your inbox.
                            </p>

                            <div className="cta-pill-container">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="cta-input"
                                />
                                <button type="submit" className="cta-submit-btn">
                                    Submit
                                </button>
                            </div>

                            <AgreeCheckbox />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}