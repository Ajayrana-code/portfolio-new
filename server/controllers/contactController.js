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

// Get all contact messages for the admin dashboard.
export const getAdminMessages = async (req, res) => {
  try {
    const [messages, total, newCount] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' })
    ]);

    return res.status(200).json({
      success: true,
      count: total,
      newCount,
      messages
    });
  } catch (error) {
    console.error('Get messages error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch messages.'
    });
  }
};

// Get one contact message by ID.
export const getAdminMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Contact.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID.'
      });
    }

    const message = await Contact.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.error('Get message error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch this message.'
    });
  }
};

// Update a message's status.
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body ?? {};

    if (!Contact.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID.'
      });
    }

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message status.'
      });
    }

    const message = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message status updated.',
      data: message
    });
  } catch (error) {
    console.error('Update message status error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update message status.'
    });
  }
};

// Delete a contact message.
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Contact.db.base.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message ID.'
      });
    }

    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.'
    });
  } catch (error) {
    console.error('Delete message error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to delete message.'
    });
  }
};