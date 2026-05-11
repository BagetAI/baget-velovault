document.addEventListener('DOMContentLoaded', () => {
    const partnerForm = document.getElementById('partnerForm');
    const formStatus = document.getElementById('formStatus');

    if (partnerForm) {
        partnerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = partnerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            formStatus.textContent = '';
            formStatus.style.color = 'inherit';

            const formData = new FormData(partnerForm);
            const payload = {
                data: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    building_name: formData.get('building'),
                    role: formData.get('role'),
                    message: formData.get('message')
                }
            };

            try {
                // Post to Partner_Leads database
                const response = await fetch('https://app.baget.ai/api/public/databases/ebaf4655-6cdf-4626-9a22-8f5b44756e41/rows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    formStatus.textContent = 'Thank you. Our team will be in touch with your BREEAM Credit Memo.';
                    formStatus.style.color = 'green';
                    partnerForm.reset();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit inquiry.');
                }
            } catch (error) {
                console.error('Submission error:', error);
                formStatus.textContent = 'Something went wrong. Please email raphael@baget.ai directly.';
                formStatus.style.color = 'red';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Add some vintage noise movement/flicker simulation if desired
    // (Static noise overlay is already in CSS)
});
