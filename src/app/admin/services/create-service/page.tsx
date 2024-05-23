"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userTokenAtom } from "@/store";
import { apiUrl } from "@/lib/constant";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import InputFilePicker from "../../_file-picker/file-picker";
import Select from "react-select";
import {
  dataInputIdType,
  dataRegion,
  dataServiceType,
} from "@/lib/data/select.data";
import { axiosIn } from "@/lib/axios";

export default function CreateService() {
  const params = useParams();
  const router = useRouter();

  const userToken = useAtomValue(userTokenAtom);

  const [inputFieldOneType, setInputFieldOneType] = useState<string | null>();
  const [inputFieldTwoType, setInputFieldTwoType] = useState<string | null>();
  const [inputFieldThreeType, setInputFieldThreeType] = useState<
    string | null
  >();

  const saveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      isAvailable,
      isInputFieldOne,
      isInputFieldTwo,
      isInputFieldThree,
      inputFieldOneLabel,
      inputFieldOneOption,
      inputFieldOneType,
      inputFieldTwoLabel,
      inputFieldTwoOption,
      inputFieldTwoType,
      inputFieldThreeLabel,
      inputFieldThreeOption,
      inputFieldThreeType,
      metaDesc,
      metaName,
      serviceName,
      publisher,
      slug,
      type,
      desc,
      imgLogo,
      imgBanner,
      region,
    } = e.target as any;

    const response = await axiosIn.post(
      `${apiUrl}/admin/services/create`,
      {
        id: params.servicesId,
        isAvailable: isAvailable.checked,
        isInputFieldOne: isInputFieldOne.checked,
        isInputFieldTwo: isInputFieldTwo.checked,
        isInputFieldThree: isInputFieldThree.checked,
        inputFieldOneLabel: inputFieldOneLabel.value,
        inputFieldOneOption: inputFieldOneOption?.value,
        inputFieldOneType: inputFieldOneType.value,
        inputFieldTwoLabel: inputFieldTwoLabel.value,
        inputFieldTwoOption: inputFieldTwoOption?.value,
        inputFieldTwoType: inputFieldTwoType.value,
        inputFieldThreeLabel: inputFieldThreeLabel.value,
        inputFieldThreeOption: inputFieldThreeOption?.value,
        inputFieldThreeType: inputFieldThreeType?.value,
        metaDesc: metaDesc.value,
        metaName: metaName.value,
        name: serviceName.value,
        publisher: publisher.value,
        slug: slug.value,
        type: type.value,
        desc: desc.value,
        imgLogo: imgLogo.value,
        imgBanner: imgBanner.value,
        region: region.value,
        inputFieldDescription: "",
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    try {
      if (response.data.statusCode == 200) {
        toast.success("Success save service");
        router.back();
      } else {
        toast.error("Failed save service");
      }
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="inline-flex w-full justify-end mb-3">
        <Button type="submit" form="save-service-form">
          Save Service
        </Button>
      </div>
      <form
        id="save-service-form"
        onSubmit={saveService}
        className="grid md:grid-cols-2 gap-6 mb-5"
      >
        <div className="w-full flex flex-col">
          <div>
            <Label>Banner Image</Label>
            <InputFilePicker className="w-full h-28" name="imgBanner" />
          </div>
          <div className="inline-flex w-full gap-8 mt-4">
            <div className="flex flex-col">
              <Label>Logo Image</Label>
              <InputFilePicker className="w-24 h-24 mt-2" name="imgLogo" />
            </div>
            <div className="mt-4 w-24 ">
              <Label>Is Available</Label>
              <Switch className="mt-5" name="isAvailable" />
            </div>
          </div>
          <div className="w-full mt-5">
            <Label>Title</Label>
            <Input
              name="serviceName"
              placeholder="Free Fire"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label>Slug</Label>
            <Input name="slug" placeholder="Free Fire" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Publisher Game</Label>
            <Input name="publisher" placeholder="Garena" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Type</Label>
            <Select options={dataServiceType} name="type" />
          </div>
          <div className="w-full">
            <Label>Region</Label>
            <Select options={dataRegion} name="region" />
          </div>
          <div className="w-full">
            <Label>Description</Label>
            <Textarea
              name="desc"
              placeholder="Lorem ipsum dolor sit amet."
            ></Textarea>
          </div>
          <div className="mt-2"></div>
          <Label className="text-center mt-4">Seo Setting</Label>
          <div className="w-full">
            <Label>Meta Title</Label>
            <Input name="metaName" placeholder="Free Fire" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Meta Description</Label>
            <Textarea
              name="metaDesc"
              placeholder="Lorem ipsum dolor sit amet."
            ></Textarea>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label className="text-center mt-5">Input Settings</Label>

          <div className="flex flex-col mt-5">
            <Label className="font-semibold">Input 1</Label>
            <div className="inline-flex gap-3 items-center mt-5">
              <Switch name="isInputFieldOne" className="" />
              <Label>Is Available</Label>
            </div>
            <div className="mt-3">
              <Label>Type Input</Label>
              <Select
                options={dataInputIdType}
                name="inputFieldOneType"
                defaultValue={dataInputIdType[0]}
                onChange={(e) => setInputFieldOneType(e?.value)}
              />
            </div>
            {
              // @ts-ignore
              inputFieldOneType == "SELECT" && (
                <div className="mt-3">
                  <Label>Data SELECT</Label>
                  <Textarea
                    name="inputFieldOneOption"
                    placeholder="json select option"
                  ></Textarea>
                </div>
              )
            }
            <div className="mt-3">
              <Label>Input Label</Label>
              <Input
                placeholder="ID Number"
                name="inputFieldOneLabel"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <Label className="font-semibold">Input 2</Label>
            <div className="inline-flex gap-3 items-center mt-5">
              <Switch name="isInputFieldTwo" className="" />
              <Label>Is Available</Label>
            </div>
            <div className="mt-3">
              <Label>Type Input</Label>
              <Select
                options={dataInputIdType}
                name="inputFieldTwoType"
                defaultValue={dataInputIdType[0]}
                onChange={(e) => setInputFieldTwoType(e?.value)}
              />
            </div>
            {
              // @ts-ignore
              inputFieldTwoType == "SELECT" && (
                <div className="mt-3">
                  <Label>Data SELECT</Label>
                  <Textarea
                    name="inputFieldTwoOption"
                    placeholder="json select option"
                  ></Textarea>
                </div>
              )
            }
            <div className="mt-3">
              <Label>Input Label</Label>
              <Input
                name="inputFieldTwoLabel"
                placeholder="ID Number"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <Label className="font-semibold">Input 3</Label>
            <div className="inline-flex gap-3 items-center mt-5">
              <Switch name="isInputFieldThree" className="" />
              <Label>Is Available</Label>
            </div>
            <div className="mt-3">
              <Label>Type Input</Label>
              <Select
                options={dataInputIdType}
                name="inputFieldThreeType"
                defaultValue={dataInputIdType[0]}
                onChange={(e) => setInputFieldThreeType(e?.value)}
              />
            </div>
            {
              // @ts-ignore
              inputFieldThreeType == "SELECT" && (
                <div className="mt-3">
                  <Label>Data SELECT</Label>
                  <Textarea
                    name="inputFieldThreeOption"
                    placeholder="json select option"
                  ></Textarea>
                </div>
              )
            }
            <div className="mt-3">
              <Label>Input Label</Label>
              <Input
                name="inputFieldThreeLabel"
                placeholder="ID Number"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
