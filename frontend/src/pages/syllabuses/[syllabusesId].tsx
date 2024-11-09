import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/syllabuses/syllabusesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditSyllabuses = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    document: [],

    student: '',

    school: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { syllabuses } = useAppSelector((state) => state.syllabuses);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { syllabusesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: syllabusesId }));
  }, [syllabusesId]);

  useEffect(() => {
    if (typeof syllabuses === 'object') {
      setInitialValues(syllabuses);
    }
  }, [syllabuses]);

  useEffect(() => {
    if (typeof syllabuses === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = syllabuses[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [syllabuses]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: syllabusesId, data }));
    await router.push('/syllabuses/syllabuses-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit syllabuses')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit syllabuses'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField>
                <Field
                  label='Document'
                  color='info'
                  icon={mdiUpload}
                  path={'syllabuses/document'}
                  name='document'
                  id='document'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormFilePicker}
                ></Field>
              </FormField>

              <FormField label='Student' labelFor='student'>
                <Field
                  name='student'
                  id='student'
                  component={SelectField}
                  options={initialValues.student}
                  itemRef={'users'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='school' labelFor='school'>
                <Field
                  name='school'
                  id='school'
                  component={SelectField}
                  options={initialValues.school}
                  itemRef={'schools'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/syllabuses/syllabuses-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditSyllabuses.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SYLLABUSES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSyllabuses;
