import Contact from '../models/Contact.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    // Check that all required fields are provided as strings.
    const fields = [name, email, subject, message];

    if (
      fields.some(
        (field) => typeof field !== 'string' || !field.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.'
      });
    }

    // Save the message in MongoDB.
    await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been received successfully.'
    });
  } catch (error) {
    // Mongoose schema validation errors.
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Please check your form details.',
        errors: Object.values(error.errors).map(
          (item) => item.message
        )
      });
    }

    console.error('Contact submission error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to submit your message right now. Please try again later.'
    });
  }
};